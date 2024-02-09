import PropTypes from 'prop-types'
import { numberFormat, generateStoreURL } from 'npm-pkg-hook'
import { ProductCheckout } from 'pkg-components'

export const ProductsStores = ({
  store,
  result,
  refs,
  sumProduct,
  existData = {},
  handleDeleteItemShopping = (product) => {
    return product
  }
}) => {
  console.log(result[store])
  return (
    <div>
      {existData > 0
        ? result[store]?.map((product, idx) => {
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
              key={product.ShoppingCard}
              nameStore={nameStore}
              numberFormat={numberFormat}
              product={product}
              sumProduct={sumProduct}
              url={url}
              {...product}
            />
          )
        })
        : <div>Carro vació</div>
      }
    </div>
  )
}

ProductsStores.propTypes = {
  existData: PropTypes.number,
  handleDeleteItemShopping: PropTypes.func,
  refs: PropTypes.shape({
    current: PropTypes.any
  }),
  result: PropTypes.any,
  store: PropTypes.any,
  sumProduct: PropTypes.func
}
