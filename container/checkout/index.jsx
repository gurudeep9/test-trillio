import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import {
  useFormTools,
  usePushNotificationOrder,
  SERVICES,
  useGetCart,
  calculateTotalPrice,
  numberFormat,
  RandomCode,
  updateCacheMod
} from 'npm-pkg-hook'
import PropTypes from 'prop-types'
import React, {
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { RippleButton, InputHooks, EmptyData } from 'pkg-components'
import { PColor } from '../../public/colors'
import { IconGoogleLocation, IconLocationMap } from '../../public/icons'
import { GET_ALL_SHOPPING_CARD } from '../restaurantes/queries'
import { ListProducts } from './helpers/ListProducts'
import {
  CREATE_MULTIPLE_ORDER_PRODUCTS,
  DELETE_ONE_ITEM_SHOPPING_PRODUCT
} from './queries'
import {
  Body,
  Card,
  CardPro,
  ContentInfo,
  Text,
  Wrapper
} from './styled'
import { Context } from 'context'

export const Checkout = ({
  locationStr = '',
  setModalLocation = (boolean) => {
    return boolean
  },
  setAlertBox = (args) => {
    return args
  }
}) => {
  // STATE
  // eslint-disable-next-line
  const [
    handleChange,
    // eslint-disable-next-line
    handleSubmit,
    // eslint-disable-next-line
    setDataValue,
    {
      dataForm,
      errorForm
    }] = useFormTools()
  const router = useRouter()
  const { setCountItemProduct } = useContext(Context)
  const [key, setKey] = useState([])
  const [totalProductPrice, setTotalProductPrice] = useState(0)

  // QUERIES
  const [dataShoppingCard, { loading }] = useGetCart()
  const result = dataShoppingCard?.reduce(function (r, a) {
    r[a.getStore?.storeName] = r[a.getStore?.storeName] || []
    r[a.getStore?.storeName].push(a)
    return r
  }, Object.create(null))

  const pushNotificationOrder = usePushNotificationOrder({
    client: SERVICES.WEB_SOCKET_CHAT
  })

  const [deleteOneItem] = useMutation(DELETE_ONE_ITEM_SHOPPING_PRODUCT, {
    onCompleted: data => {
      setAlertBox({ message: data?.deleteOneItem?.message })
      if (dataShoppingCard?.length === 1) {
        setAlertBox({ message: 'Tu carrito esta vació' })
        router.replace('/restaurantes')
      }
    }
  })
  const [createMultipleOrderStore] = useMutation(CREATE_MULTIPLE_ORDER_PRODUCTS, {
    onCompleted: data => {
      if (data.createMultipleOrderStore.success === true) {
        router.push('/proceso-de-compra/finalizar')
      }
    }
  })
  const refs = useRef([React.createRef(), React.createRef()])

  const { department, pais, uLocationKnow, city } = locationStr || {}
  const { dName } = department || {}
  const { cName } = city || {}
  const { cName: country } = pais || {}
  const objLocation = { dName, uLocationKnow, cName, country }

  const handleSubmitPedido = async () => {
    setCountItemProduct(0)
    const newArray = dataShoppingCard.map(x => { return { ShoppingCard: x.ShoppingCard, idStore: x.getStore.idStore } })
    const code = RandomCode(10)

    if (!objLocation) {
      return setAlertBox({ message: 'Elige una ubicación' })
    }

    try {
      const { data: { createMultipleOrderStore: { success, message } } } = await createMultipleOrderStore({
        variables: {
          input: {
            setInput: newArray,
            change: parseInt(dataForm?.change?.replace(/\./g, '')),
            pickUp: 1,
            totalProductsPrice: totalProductPrice,
            pCodeRef: code,
            payMethodPState: 1,
            pPRecoger: 1,
            locationUser: JSON.stringify(objLocation)
          }
        },
        update: (cache, { data: { getAllShoppingCard } }) => {
          return updateCacheMod({
            cache,
            query: GET_ALL_SHOPPING_CARD,
            nameFun: 'getAllShoppingCard',
            dataNew: getAllShoppingCard
          })
        }
      })

      setAlertBox({ color: `${success ? 'success' : 'error'}`, message: `${success ? message : 'No se pudo realizar tu pedido'}` })
      if (newArray[0]?.idStore) {
        await pushNotificationOrder(code, newArray[0]?.idStore)
      }
    } catch (err) {
      setAlertBox({ message: `${err.message}`, duration: 7000 })
    }
    return null
  }

  // EFFECTS
  useEffect(() => {
    if (!loading && dataShoppingCard !== null) {
      const dataProduct2 = Object.keys(result)
      setKey(dataProduct2)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataShoppingCard])


  useEffect(() => {
    const totalPrice = calculateTotalPrice(dataShoppingCard)
    setTotalProductPrice(Math.abs(totalPrice))
  }, [dataShoppingCard])


  // HANDLESS
  const handleDeleteItemShopping = item => {
    deleteOneItem({
      variables: {
        cState: item.cState,
        ShoppingCard: item.ShoppingCard
      },
      update: (cache, { data: { getAllShoppingCard } }) => {
        return updateCacheMod({
          cache,
          query: GET_ALL_SHOPPING_CARD,
          nameFun: 'getAllShoppingCard',
          dataNew: getAllShoppingCard
        })
      }
    })
  }
  /**
   * Calculate the total cost of products including delivery.
   *
   * @param {number} ProPrice - Price of a single product.
   * @param {number} ProDelivery - Delivery cost (optional).
   * @param {number} cant - Quantity of products.
   * @returns {number} - Total cost including delivery.
   */
  const sumProduct = (ProPrice, ProDelivery, cant) => {
    // Parse input values to integers
    const price = ProPrice || 0
    const quantity = cant || 0
    const delivery = ProDelivery || 0

    // Calculate the total cost of products
    const productCost = price * quantity

    // Calculate the total cost including delivery
    const totalCost = productCost + delivery

    return totalCost
  }

  const existData = dataShoppingCard?.length
  if (!existData) return <EmptyData />
  return (
    <Body>
      <Card>
        <CardPro>
          <ListProducts
            ashKey={key}
            existData={existData}
            handleDeleteItemShopping={handleDeleteItemShopping}
            loading={loading}
            refs={refs}
            result={result}
            sumProduct={sumProduct}
          />
          <Wrapper style={{ display: 'flex' }}>
            <Text bold='900' size='30px' >
              Total
            </Text>
            <Text
              bold='900'
              color={PColor}
              size='30px'
            >
              $ {numberFormat(dataShoppingCard.length > 0 && totalProductPrice)}
            </Text>
          </Wrapper>
        </CardPro>
      </Card>
      <Card>
        <ContentInfo>
          <div className='ctn-location' onClick={() => { return setModalLocation(true) }}>
            <button >
              <IconGoogleLocation color={PColor} size={70} />
            </button>
            <div className='delivery-location' onClick={() => { return setModalLocation(true) }}>
              <span ><IconLocationMap color={PColor} size={20} /> {uLocationKnow || (pais ? `${pais?.cName} ${department?.dName} ${city?.cName}` : null)}</span>
              <span className='sub-location'>{pais && `${pais?.cName} ${department?.dName} ${city?.cName}`}</span>
            </div>
          </div>
          <InputHooks
            error={errorForm?.change}
            name='change'
            onChange={handleChange}
            required
            title='cambio'
            value={numberFormat(dataForm?.change)}
            width={'100%'}
          />
          <RippleButton
            disabled={false}
            margin='20px auto'
            onClick={() => { return handleSubmitPedido() }}
            widthButton='100%'
          >
              Hacer pedido
          </RippleButton>
        </ContentInfo>
      </Card>

    </Body>
  )
}

Checkout.propTypes = {
  locationStr: PropTypes.object,
  setAlertBox: PropTypes.func,
  setModalLocation: PropTypes.func
}


const ProcessCheckoutCard = () => {
  return (
    <div>
      <Wrapper border>
        <Text>Estandar</Text>
      </Wrapper>
    </div>
  )
}

ProcessCheckoutCard.propTypes = {}
