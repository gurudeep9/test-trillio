import {
  useLazyQuery,
  useMutation,
  useQuery
} from '@apollo/client'
import { useRouter } from 'next/router'
import { useFormTools } from 'npm-pkg-hook'
import PropTypes from 'prop-types'
import React, {
  useEffect,
  useRef,
  useState
} from 'react'
import { RippleButton, InputHooks } from 'pkg-components'
import { PColor } from '../../public/colors'
import { IconGoogleLocation, IconLocationMap } from '../../public/icons'
import {
  numberFormat,
  RandomCode,
  updateCache
} from '../../utils'
import { GET_ALL_SHOPPING_CARD } from '../restaurantes/queries'
import { ListProducts } from './helpers/ListProducts'
import {
  CREATE_MULTIPLE_ORDER_PRODUCTS,
  DELETE_ONE_ITEM_SHOPPING_PRODUCT,
  PUSH_NOTIFICATION_ORDER_STORE
} from './queries'
import {
  Body,
  Card,
  CardPro,
  ContainerAnimation,
  ContainerAnimationTow,
  ContentInfo,
  flex,
  Text,
  Wrapper
} from './styled'

export const Checkout = ({
  setAlertBox,
  setCountItemProduct,
  locationStr,
  setModalLocation
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
  const [active, setActive] = useState(1)
  const router = useRouter()
  const [key, setSetKey] = useState([])
  const handleClick = index => { setActive(index === active ? true : index) }
  // QUERIES
  const { data: dataShoppingCard, loading } = useQuery(GET_ALL_SHOPPING_CARD)
  const result = dataShoppingCard?.getAllShoppingCard?.reduce(function (r, a) {
    r[a.getStore?.storeName] = r[a.getStore?.storeName] || []
    r[a.getStore?.storeName].push(a)
    return r
  }, Object.create(null))

  const [pushNotificationOrder] = useLazyQuery(PUSH_NOTIFICATION_ORDER_STORE, {
    context: { clientName: 'admin-server' }

  })
  const [deleteOneItem] = useMutation(DELETE_ONE_ITEM_SHOPPING_PRODUCT, {
    onCompleted: data => {
      setAlertBox({ message: data?.deleteOneItem?.message })
      if (dataShoppingCard?.getAllShoppingCard?.length === 1) {
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
  const [totalProductPrice, setTotalProductPrice] = useState(0)
  // eslint-disable-next-line
  const handleSubmitPedido = async () => {
    const newArray = dataShoppingCard?.getAllShoppingCard.map(x => { return { ShoppingCard: x.ShoppingCard, idStore: x.getStore.idStore } })
    const code = RandomCode(10)
    if (!objLocation) return setAlertBox({ message: 'Elige una ubicación' })
    await createMultipleOrderStore({
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
        return updateCache({
          cache,
          query: GET_ALL_SHOPPING_CARD,
          nameFun: 'getAllShoppingCard',
          dataNew: getAllShoppingCard
        })
      }
    }).then(x => {
      const success = x.data.createMultipleOrderStore.success
      setAlertBox({ color: `${success ? 'success' : 'error'}`, message: `${success ? x.data.createMultipleOrderStore.message : 'No se pudo realizar tu pedido'}` })
      pushNotificationOrder({
        variables: {
          pCodeRef: code,
          idStore: newArray[0]?.idStore || ''
        }
      })
    }).catch(err => { return setAlertBox({ message: `${err}`, duration: 7000 }) })
  }
  // EFFECTS
  useEffect(() => {
    if (!loading && dataShoppingCard !== null) {
      const dataProduct2 = Object.keys(result)
      setSetKey(dataProduct2)
      setCountItemProduct(dataShoppingCard?.getAllShoppingCard.length || 0)
    }
  }, [dataShoppingCard])
  const total = 0
  let suma = 0
  useEffect(() => {
    dataShoppingCard?.getAllShoppingCard.forEach((a) => {
      const { productFood, cantProducts } = a || {}
      const { ProPrice, ValueDelivery } = productFood || {}
      const PriceFinal = (ProPrice * cantProducts) + ValueDelivery
      suma += PriceFinal
      setTotalProductPrice(suma)
    })
  }, [
    totalProductPrice,
    suma,
    total,
    dataShoppingCard
  ])
  // HANDLESS
  const handleDeleteItemShopping = item => {
    deleteOneItem({
      variables: {
        cState: item.cState,
        ShoppingCard: item.ShoppingCard
      },
      update: (cache, { data: { getAllShoppingCard } }) => {
        return updateCache({
          cache,
          query: GET_ALL_SHOPPING_CARD,
          nameFun: 'getAllShoppingCard',
          dataNew: getAllShoppingCard
        })
      }
    })
  }
  const sumProduct = (ProPrice, ProDelivery, cant) => {
    const price = parseInt(ProPrice)
    const priceFinal = cant * price
    const delivery = parseInt(ProDelivery || 0)
    return delivery ? priceFinal + delivery : priceFinal
  }
  const checkoutCart = active === 2
  const existData = dataShoppingCard?.getAllShoppingCard?.length
  return (
    <Body>
      {existData > 0
        ? <Card>
          <RippleButton
            active={active === 1}
            bgColor='transparent'
            borderRadius='0'
            color='red'
            label='Entrega'
            margin='0px 5px'
            onClick={() => { return active !== 1 && handleClick(1) }}
            padding='10px'
          />
          <RippleButton
            active={active === 2}
            bgColor='transparent'
            borderRadius='0'
            color='red'
            label='Recoger'
            margin='0px 5px'
            onClick={() => { return active !== 2 && handleClick(2) }}
            padding='10px'
          />
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
            {active === 1
              ? <ContainerAnimation>
                <InputHooks
                  error={errorForm?.change}
                  name='change'
                  onChange={handleChange}
                  required
                  title='cambio'
                  value={numberFormat(dataForm?.change)}
                  width={'100%'}
                />
              </ContainerAnimation>
              : checkoutCart &&
              <ContainerAnimationTow>
                <ProcessCheckoutCard />
              </ContainerAnimationTow>
            }
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
        : <div>Carrito vacio</div>}
      {existData > 0 && <Card>
        <CardPro>
          <ListProducts
            ashKey={key}
            existData={existData}
            handleDeleteItemShopping={handleDeleteItemShopping}
            refs={refs}
            result={result}
            sumProduct={sumProduct}
          />
          <Wrapper styles={flex}>
            <Text bold='900' size='30px' >
              Total
            </Text>
            <Text
              bold='900'
              color={PColor}
              size='30px'
            >
              $ {numberFormat(dataShoppingCard?.getAllShoppingCard.length > 0 && totalProductPrice)}
            </Text>
          </Wrapper>
        </CardPro>
      </Card>}
    </Body>
  )
}

Checkout.propTypes = {
  locationStr: PropTypes.object,
  setAlertBox: PropTypes.func,
  setCountItemProduct: PropTypes.func,
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
