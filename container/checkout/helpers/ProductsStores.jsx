import { CardProduct, ContentTotal } from '@/components/AsideCheckout/styled'
import PropTypes from 'prop-types'
import { APColor, PColor } from 'public/colors'
import { numberFormat } from 'utils'
import { Text } from '../styled'

export const ProductsStores = ({
  store,
  result,
  refs,
  sumProduct,
  handleDeleteItemShopping,
  existData
}) => {
  return (
    <div>
      {existData > 0
        ? result[store]?.map((product, idx) => {
          return (
            <CardProduct key={product.ShoppingCard}>
              <div className='item-line'>
                <Text margin='40px 0' size='20px'>{product.productFood?.pName}</Text>
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
                    $ {numberFormat(product.productFood?.ProDescuento)}
                  </Text>
                </div>
                <div className='footer' style={{ display: 'flex' }}>
                  <Text color={PColor}>
                    Editar
                  </Text>
                  <button onClick={() => { return handleDeleteItemShopping(product) }}>
                    <Text color='#ccc' margin='0 0 0 10px' >
                      Eliminar
                    </Text>
                  </button>
                </div>
              </div>
              <ContentTotal>
                <Text margin='0 0 0 10px' >
                  Subtotal
                </Text>
                <Text margin='0 0 0 10px' >
                  $ {numberFormat(product.productFood?.ProPrice)}
                </Text>
              </ContentTotal>
              <ContentTotal>
                <Text margin='0 0 0 10px' >Costo de envió</Text>
                {product.productFood?.ValueDelivery !== null || 0 ? <Text margin='0 0 0 10px' >$ {numberFormat(product.productFood?.ValueDelivery)}</Text> : <Text color={APColor}>Gratis</Text>}
                <Text margin='0 0 0 10px'>
                  {numberFormat(product.productFood?.ValueDelivery)}
                </Text>
              </ContentTotal>
              <ContentTotal>
                <Text margin='0 0 0 10px' >
                  Costo Final
                </Text>
                <Text margin='0 0 0 10px' ref={refs.current[idx]}>$ {numberFormat(sumProduct(product.productFood?.ProPrice, product.productFood?.ValueDelivery, product.cantProducts))}</Text>
              </ContentTotal>
            </CardProduct>
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
