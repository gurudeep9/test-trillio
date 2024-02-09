import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import { Context } from '../../context/index'
import { PColor } from 'public/colors'
import { generateStoreURL, numberFormat, useAsideCart } from 'npm-pkg-hook'
import {
  Overline,
  RippleButton,
  IconCancel,
  EmptyData,
  ProductCheckout
} from 'pkg-components'
import {
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
                        {result2[store]?.map((product) => {
                          const nameStore = product?.getStore?.storeName || ''
                          const comment = product.comments ?? ''
                          const url = generateStoreURL({
                            city: product.getStore.city,
                            department: product.getStore.department,
                            storeName: nameStore,
                            idStore: product.getStore.idStore
                          })
                          return (
                            <ProductCheckout
                              comment={comment}
                              handleDeleteItemShopping={handleDeleteItemShopping}
                              handleEditProduct={handleEditProduct}
                              key={product.ShoppingCard}
                              nameStore={nameStore}
                              numberFormat={numberFormat}
                              product={product}
                              sumProduct={sumProduct}
                              url={url}
                              {...product}
                            />
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
