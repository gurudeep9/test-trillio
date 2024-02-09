import PropTypes from 'prop-types'
import Link from 'next/link'
import Image from 'next/image'
import React, { useContext } from 'react'
import { Context } from '../../context/index'
import { APColor, PColor } from 'public/colors'
import { generateStoreURL, numberFormat, useAsideCart } from 'npm-pkg-hook'
import {
  Overline,
  RippleButton,
  IconCancel,
  EmptyData,
  getGlobalStyle
} from 'pkg-components'
import {
  CardProduct,
  Content,
  LateralModal,
  Text,
  ActionPay,
  ContentTotal
} from './styled'
import { useRouter } from 'next/router'
import styles from './styles.module.css'

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
    handleVerifyStoreOpenStatus,
    sumProduct
  } = useAsideCart({
    setCountItemProduct,
    location,
    setAlertBox,
    openModalProduct,
    setOpenModalProduct,
    handleMenu
  })
  const emptyData =
    Array.isArray(dataShoppingCard) && dataShoppingCard?.length > 0
  return (
    <div>
      <Overline
        onClick={() => {
          return handleMenu(1)
        }}
        show={menu === 1}
        zIndex='999'
      />
      <LateralModal show={menu === 1}>
        <RippleButton
          bgColor='transparent'
          onClick={() => {
            return handleMenu(1)
          }}
          widthButton='min-content'
        >
          <IconCancel color={PColor} size='25px' />
        </RippleButton>
        {emptyData
          ? (
            <Content>
              <div className='restaurant-cart-header'>Tu pedido en</div>
              <div>
                {key?.map((store, i) => {
                  return (
                    <div key={i}>
                      <div>
                        {result2[store]?.map((product, idx) => {
                          const nameStore = product?.getStore?.storeName || ''
                          const comment = product.comments ?? ''
                          const url = generateStoreURL({
                            city: product.getStore.city,
                            department: product.getStore.department,
                            storeName: nameStore,
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
                                  >
                                    {nameStore}
                                  </Text>
                                </a>
                              </Link>

                              <div>
                                <Image
                                  alt=''
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
                                <Text
                                  color={getGlobalStyle('--color-neutral-black')}
                                  margin={'10px 0'}
                                  size={getGlobalStyle('--font-size-2xl')}
                                >
                                  {product.productFood?.pName ?? ''}
                                </Text>
                                {comment && (
                                  <Text
                                    color='#717171'
                                    margin={'2px 0'}
                                    size={getGlobalStyle('--font-size-md')}
                                  >
                                  Obs: {comment}
                                  </Text>
                                )}
                                <div
                                  style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    margin: '15px 0'
                                  }}
                                >
                                  <Text color={APColor}>
                                  ${' '}
                                    {numberFormat(product.productFood?.ProPrice)}
                                  </Text>
                                  <Text color={APColor}>
                                  Cantidad {numberFormat(product.cantProducts)}
                                  </Text>
                                  <Text
                                    line
                                    margin='0 0 0 10px'
                                    size={getGlobalStyle('--font-size-md')}
                                  >
                                  ${' '}
                                    {numberFormat(
                                      product.productFood?.ProDescuento || 0
                                    )}
                                  </Text>
                                </div>
                                <div className={styles.card_sub_items}>
                                  {product?.ExtProductFoodsAll?.map((subItem, idx) => {
                                    const subItemName = `${subItem?.quantity}x ${subItem?.extraName}`
                                    const isLastItem = idx === product.ExtProductFoodsAll.length - 1
                                    return (
                                      <span key={subItem.exPid}>
                                        {subItemName}
                                        {isLastItem ? '' : ', '}
                                      </span>
                                    )
                                  })}
                                </div>

                                <div
                                  className='footer'
                                  style={{ display: 'flex' }}
                                >
                                  <button
                                    onClick={() => {
                                      return handleEditProduct(product)
                                    }}
                                    style={{
                                      backgroundColor: getGlobalStyle(
                                        '--color-base-transparent'
                                      )
                                    }}
                                  >
                                    <Text
                                      color={PColor}
                                      size={getGlobalStyle('--font-size-md')}
                                    >
                                    Editar
                                    </Text>
                                  </button>
                                &nbsp; &nbsp;
                                  <button
                                    onClick={() => {
                                      return handleDeleteItemShopping(product)
                                    }}
                                    style={{
                                      backgroundColor: getGlobalStyle(
                                        '--color-base-transparent'
                                      )
                                    }}
                                  >
                                    <Text
                                      color={getGlobalStyle(
                                        '--color-alvi-neutral-gray-dark'
                                      )}
                                      margin='0 0 0 10px'
                                      size={getGlobalStyle('--font-size-md')}
                                    >
                                    Eliminar
                                    </Text>
                                  </button>
                                </div>
                              </div>
                              <ContentTotal>
                                <Text margin='0 0 0 10px'> Subtotal</Text>
                                <Text margin='0 0 0 10px'>
                                $ {numberFormat(product.productFood?.ProPrice)}
                                </Text>
                              </ContentTotal>
                              <ContentTotal>
                                <Text margin='0 0 0 10px'>Costo de envío</Text>
                                {product.productFood?.ValueDelivery !== null ||
                              0
                                  ? (
                                    <Text margin='0 0 0 10px'>
                                  ${' '}
                                      {numberFormat(
                                        product.productFood?.ValueDelivery
                                      )}
                                    </Text>
                                  )
                                  : (
                                    <Text color={APColor}>Gratis</Text>
                                  )}
                              </ContentTotal>
                              <ContentTotal>
                                <Text margin='0 0 0 10px'>Costo Final</Text>
                                <Text margin='0 0 0 10px'>
                                ${' '}
                                  {numberFormat(
                                    sumProduct(
                                      product.productFood?.ProPrice,
                                      product.productFood?.ValueDelivery,
                                      product.cantProducts
                                    )
                                  )}
                                </Text>
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
          )
          : (
            <EmptyData height={300} />
          )}
        {emptyData && (
          <ActionPay>
            <ContentTotal>
              <Text bold='900'>Total</Text>
              <Text bold='900'>
                ${' '}
                {numberFormat(dataShoppingCard.length > 0 && totalProductPrice)}
              </Text>
            </ContentTotal>

            <RippleButton
              margin='auto'
              onClick={() => {
                const { open, message } = handleVerifyStoreOpenStatus()
                if (!open) return setAlertBox({ message })
                window.scrollTo(0, 0)
                window.location.href = '/proceso-de-compra'
                return handleMenu(false)
              }}
              widthButton='100%'
            >
              Eligir método de pago
            </RippleButton>
          </ActionPay>
        )}
      </LateralModal>
    </div>
  )
}

AsideCheckout.propTypes = {
  menu: PropTypes.number
}
