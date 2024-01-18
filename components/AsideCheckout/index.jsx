import PropTypes from 'prop-types'
import Link from 'next/link'
import Image from 'next/image'
import React, { useContext } from 'react'
import { Context } from '../../context/index'
import { APColor, PColor } from 'public/colors'
import {
  generateStoreURL,
  numberFormat,
  useAsideCart
} from 'npm-pkg-hook'
import { Overline, RippleButton, IconCancel } from 'pkg-components'
import {
  CardProduct,
  Content,
  LateralModal,
  Text,
  ActionPay,
  ContentTotal
} from './styled'
import { useRouter } from 'next/router'

export const AsideCheckout = ({ menu }) => {
  const location = useRouter()

  const {
    setAlertBox,
    openModalProduct,
    setOpenModalProduct,
    setCountItemProduct,
    handleMenu
  } = useContext(Context)

  const {
    key,
    totalProductPrice,
    result2,
    dataShoppingCard,
    handleDeleteItemShopping,
    handleEditProduct,
    sumProduct
  } = useAsideCart({
    setCountItemProduct,
    location,
    setAlertBox,
    openModalProduct,
    setOpenModalProduct,
    handleMenu
  })

  return (
    <div>
      <Overline
        onClick={() => { return handleMenu(1) }}
        show={menu === 1}
        zIndex='999'
      />
      <LateralModal show={menu === 1}>
        <RippleButton
          bgColor='transparent'
          onClick={() => { return handleMenu(1) }}
          widthButton='min-content'
        >
          <IconCancel color={PColor} size='25px' />
        </RippleButton>
        <Content>
          <div className='restaurant-cart-header'>
            Tu pedido en
          </div>
          <div>
            {key?.map((store, i) => {
              return (
                <div key={i}>
                  <div>
                    {result2[store]?.map((product, idx) => {
                      const url = generateStoreURL({
                        city: product.getStore.city,
                        department: product.getStore.department,
                        storeName: product.getStore.storeName,
                        idStore: product.getStore.idStore
                      })
                      return (
                        <CardProduct key={product.ShoppingCard}>
                          <Link href={url}>
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
                              blurDataURL='/images/cat1.png'
                              className='store_image'
                              height={100}
                              objectFit='cover'
                              placeholder='blur'
                              src={'/images/cat1.png'}
                              width={100}
                            />
                          </div>
                          <div className='item-line'>
                            <Text margin={'40px 0'} size='20px'>{product.productFood?.pName}</Text>
                            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '15px 0' }}>
                              <Text color={APColor}>
                                $ {numberFormat(product.productFood?.ProPrice)}
                              </Text>
                              <Text color={APColor}>
                                Cantidad {numberFormat(product.cantProducts)}
                              </Text>
                              <Text
                                line
                                margin='0 0 0 10px'
                                size='25px'
                              >
                                $ {numberFormat(product.productFood?.ProDescuento || 0)}</Text>
                            </div>
                            <div className='footer' style={{ display: 'flex' }}>
                              <button onClick={() => { return handleEditProduct(product) }}>
                                <Text color={PColor}>
                                  Editar
                                </Text>
                              </button>
                              &nbsp;
                              &nbsp;
                              <button onClick={() => { return handleDeleteItemShopping(product) }}>
                                <Text
                                  color='#ccc'
                                  margin='0 0 0 10px'
                                >
                                  Eliminar
                                </Text>
                              </button>
                            </div>
                          </div>
                          <ContentTotal>
                            <Text margin='0 0 0 10px'> Subtotal</Text>
                            <Text margin='0 0 0 10px'>$ {numberFormat(product.productFood?.ProPrice)}</Text>
                          </ContentTotal>
                          <ContentTotal>
                            <Text margin='0 0 0 10px' >Costo de envío</Text>
                            {product.productFood?.ValueDelivery !== null || 0 ? <Text margin='0 0 0 10px' >$ {numberFormat(product.productFood?.ValueDelivery)}</Text> : <Text color={APColor}>Gratis</Text>}
                          </ContentTotal>
                          <ContentTotal>
                            <Text margin='0 0 0 10px' >Costo Final</Text>
                            <Text margin='0 0 0 10px'>$ {numberFormat(sumProduct(product.productFood?.ProPrice, product.productFood?.ValueDelivery, product.cantProducts))}</Text>
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
        {dataShoppingCard?.length && <ActionPay>
          <ContentTotal>
            <Text bold='900'>Total</Text>
            <Text bold='900'>$ {numberFormat(dataShoppingCard.length > 0 && totalProductPrice)}</Text>
          </ContentTotal>
          <Link href='/proceso-de-compra' >
            <a>
              <RippleButton
                margin={'auto'}
                onClick={() => { return handleMenu(false) }}
                widthButton='100%'
              >
                Eligir método de pago
              </RippleButton>
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
