/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import { useMutation, useQuery } from '@apollo/client'
import Link from 'next/link'
import Image from 'next/image'
import React, {
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { DELETE_ONE_ITEM_SHOPPING_PRODUCT } from '../../container/checkout/queries'
import { GET_ALL_SHOPPING_CARD } from '../../container/restaurantes/queries'
import { Context } from '../../context/index'
import { APColor, PColor } from '../../public/colors'
import { IconCancel } from '../../public/icons'
import { numberFormat, updateCache } from '../../utils'
import { Overline, RippleButton } from 'pkg-components'
import {
  CardProduct,
  Content,
  LateralModal,
  Text,
  ActionPay,
  ContentTotal
} from './styled'

export const AsideCheckout = ({ menu }) => {
  const { setAlertBox, setCountItemProduct, handleMenu } = useContext(Context)
  const { data: dataShoppingCard, loading } = useQuery(GET_ALL_SHOPPING_CARD)
  useEffect(() => {
    setAlertBox({ message: '', color: 'success' })
  }, [])
  const result2 = dataShoppingCard?.getAllShoppingCard.length > 0 && dataShoppingCard?.getAllShoppingCard?.reduce(function (r, a) {
    r[a.getStore?.storeName] = r[a.getStore?.storeName] || []
    r[a.getStore?.storeName].push(a)
    return r
  }, Object.create(null))
  const [key, setSetKey] = useState([])
  useEffect(() => {
    if (!loading &&
      dataShoppingCard !== null &&
      dataShoppingCard?.getAllShoppingCard?.length > 0
    ) {
      const dataProduct2 = Object.keys(result2)
      setSetKey(dataProduct2)
      setCountItemProduct(dataShoppingCard?.getAllShoppingCard.length || 0)
    }
  }, [dataShoppingCard, loading, setCountItemProduct])

  const sumProduct = (ProPrice, ProDelivery, cant) => {
    const price = parseInt(ProPrice)
    const priceFinal = cant * price
    const delivery = parseInt(ProDelivery || 0)
    return delivery ? priceFinal + delivery : priceFinal
  }
  const refs = useRef([React.createRef(), React.createRef()])
  const [totalProductPrice, setTotalProductPrice] = useState(0)
  const total = 0
  let suma = 0
  useEffect(() => {
    dataShoppingCard?.getAllShoppingCard.forEach((a) => {
      const { productFood, cantProducts } = a || {}
      const { ProPrice, ValueDelivery } = productFood || {}
      const PriceFinal = (ProPrice * cantProducts) + ValueDelivery
      // eslint-disable-next-line react-hooks/exhaustive-deps
      suma += PriceFinal
      setTotalProductPrice(Math.abs(suma))
    })
  }, [totalProductPrice, suma, total, dataShoppingCard])
  const [deleteOneItem] = useMutation(DELETE_ONE_ITEM_SHOPPING_PRODUCT, {
    onCompleted: data => {
      setAlertBox({ message: data?.deleteOneItem?.message })
      if (dataShoppingCard?.getAllShoppingCard.length === 1) {
        setAlertBox({ message: 'Tu carrito esta vació' })
        handleMenu(false)
      }
    }
  })
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
  return (
    <div>
      <Overline onClick={() => { return handleMenu(1) }} show={menu === 1} />
      <LateralModal show={menu === 1}>
        <RippleButton bgColor='transparent' onClick={() => { return handleMenu(1) }}>
          <IconCancel color={PColor} size='15px' />
        </RippleButton>
        <Content>
          {dataShoppingCard?.getAllShoppingCard?.length > 0 && <div className='restaurant-cart-header'>Tu pedido en</div>}
          <div>
            {key?.map((store, i) => {
              return (
                <div key={i + 1}>
                  <div>
                    {result2[store]?.map((product, idx) => {
                      return (
                        <CardProduct key={product.ShoppingCard}>
                          <Link href={`/delivery/${product.getStore.city.cName?.toLocaleLowerCase()}-${product.getStore.department.dName?.toLocaleLowerCase()}/${product.getStore.storeName}/${product.getStore.idStore}`}>
                            <a>
                              <Text
                                color={PColor}
                                margin={'10px 0'}
                                size='1.325rem'
                              >{product.getStore.storeName}</Text>
                            </a>
                          </Link>
                          <div>
                            <Image
                              alt={'Picture of the author'}
                              blurDataURL='/images/DEFAULTBANNER.png'
                              className='store_image'
                              height={100}
                              objectFit='cover'
                              placeholder='blur'
                              src={'/images/DEFAULTBANNER.png'}
                              width={100}
                            />
                          </div>
                          <div className='item-line'>
                            <Text margin={'40px 0'} size='20px'>{product.productFood?.pName}</Text>
                            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0' }}>
                              <Text color={APColor}> $ {numberFormat(product.productFood?.ProPrice)}</Text>
                              <Text color={APColor}> Cantidad {numberFormat(product.cantProducts)}</Text>
                              <Text
                                line
                                margin='0 0 0 10px'
                                size='25px'
                              >$ {numberFormat(product.productFood?.ProDescuento)}</Text>
                            </div>
                            <div className='footer' style={{ display: 'flex' }}>
                              <Text color={PColor} >Editar</Text>
                              <Text
                                color='#ccc'
                                margin='0 0 0 10px'
                                onClick={() => { return handleDeleteItemShopping(product) }}
                              >Eliminar</Text>
                            </div>
                          </div>
                          <ContentTotal>
                            <Text margin='0 0 0 10px' > Subtotal</Text>
                            <Text margin='0 0 0 10px' >$ {numberFormat(product.productFood?.ProPrice)}</Text>
                          </ContentTotal>
                          <ContentTotal>
                            <Text margin='0 0 0 10px' >Costo de envio</Text>
                            {product.productFood?.ValueDelivery !== null || 0 ? <Text margin='0 0 0 10px' >$ {numberFormat(product.productFood?.ValueDelivery)}</Text> : <Text color={APColor}>Gratis</Text>}
                          </ContentTotal>
                          <ContentTotal>
                            <Text margin='0 0 0 10px' >Costo Final</Text>
                            <Text margin='0 0 0 10px' ref={refs.current[idx]}>$ {numberFormat(sumProduct(product.productFood?.ProPrice, product.productFood?.ValueDelivery, product.cantProducts))}</Text>
                          </ContentTotal>
                        </CardProduct>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </Content>
        {dataShoppingCard?.getAllShoppingCard?.length > 0 && <ActionPay>
          <ContentTotal>
            <Text bold='900'>Total</Text>
            <Text bold='900'>$ {numberFormat(dataShoppingCard?.getAllShoppingCard.length > 0 && totalProductPrice)}</Text>
          </ContentTotal>
          <Link href='/proceso-de-compra' >
            <a>
              <RippleButton
                margin={'auto'}
                onClick={() => { return handleMenu(false) }}
                widthButton='100%'
              >Eligir método de pago</RippleButton>
            </a>
          </Link>
        </ActionPay>}
      </LateralModal>
    </div>
  )
}

AsideCheckout.propTypes = {
  menu: PropTypes.number
}
