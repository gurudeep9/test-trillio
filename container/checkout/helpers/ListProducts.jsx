import PropTypes from 'prop-types'

import { Text } from '../styled'
import { ProductsStores } from './ProductsStores'

export const ListProducts = ({
  existData,
  result,
  refs,
  handleDeleteItemShopping,
  sumProduct,
  ashKey
}) => {
  return (
    <>
      {existData > 0
        ? ashKey?.map((store, index) => {
          return (
            <div key={index}>
              <div>
                <Text className='garnish-choices__title' size='30px'>{store}</Text>
              </div>
              <div key={store.store}>
                <ProductsStores
                  existData={existData}
                  handleDeleteItemShopping={handleDeleteItemShopping}
                  refs={refs}
                  result={result}
                  store={store}
                  sumProduct={sumProduct}
                />
              </div>
            </div>
          )
        })
        : <div>Carrito vacio</div>
      }
    </>
  )
}

ListProducts.propTypes = {
  ashKey: PropTypes.shape({
    map: PropTypes.func
  }),
  existData: PropTypes.number,
  handleDeleteItemShopping: PropTypes.func.isRequired,
  refs: PropTypes.any,
  result: PropTypes.any,
  sumProduct: PropTypes.any
}
