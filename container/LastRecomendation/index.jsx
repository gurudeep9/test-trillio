import PropTypes from 'prop-types'
import { useLazyQuery, useQuery } from '@apollo/client'
import { Container, Title } from './styled'
import { GET_ONE_STORE_IN_CATEGORY } from 'container/categoryStores/queries'
import {
  useContext,
  useEffect,
  useState
} from 'react'
import { GET_ALL_STORE_RECOMMENDED } from 'gql/Recommendation'
import { ListRestaurant } from 'container/restaurantes/restaurant'
import { Context } from 'context'
import Link from 'next/link'
import { useGetFoodRecomended } from 'npm-pkg-hook'
import {
  Row,
  Column,
  CardProducts
} from 'pkg-components'

export const LastRecommended = ({ ID_CATEGORIE }) => {
  const [getOneCatStore, { data: dataCatSto }] = useLazyQuery(GET_ONE_STORE_IN_CATEGORY)
  const { data: dataStoreRecommended } = useQuery(GET_ALL_STORE_RECOMMENDED, {
    variables: {
      catStore: ID_CATEGORIE
    }
  })
  const [categoryStores, setDataCatStore] = useState({})
  useEffect(() => {
    getOneCatStore({
      variables: {
        catStore: ID_CATEGORIE
      }
    }).catch(() => { })
    setDataCatStore(dataCatSto?.getOneCatStore)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ID_CATEGORIE, dataStoreRecommended, dataCatSto])
  const { cName } = categoryStores || {}
  return (
    <Container>
      {dataStoreRecommended?.getAllMatchesStoreRecommended.length > 0 &&
        <>
          <Title>Basado en tu última visita {cName && `en ${cName}`}  te recomendamos</Title>
          <ListRestaurant
            data={dataStoreRecommended?.getAllMatchesStoreRecommended || []}
          />
        </>}
    </Container>
  )
}

LastRecommended.propTypes = {
  ID_CATEGORIE: PropTypes.string
}

export const ItMayInterestYou = ({ PRODUCT_NAME_COOKIE }) => {
  const { openProductModal, setOpenProductModal } = useContext(Context)
  let name = PRODUCT_NAME_COOKIE
  name = name?.split(' ')[0]
  const [dataProduct] = useGetFoodRecomended({ name: 'buñuelos' })

  return (
    <Column margin={'50px auto'} maxWidth='1366px'>
      {(dataProduct?.length > 0) &&
        <Title>
          Te puede interesar {name}
        </Title>
      }
      <Row
        display='grid'
        gridGap='10px'
        gridTemplateColumns='repeat(auto-fill,minmax(380px,1fr))'
      >
        {dataProduct?.length > 0 && dataProduct?.map((food, i) => {
          return (
            <div key={i + 1}>
              <Link
                href={{
                  pathname: `/restaurantes`,
                  query: { plato: food.pId }
                }}
                passHref
                replace
                shallow
              >
                <a>
                  <CardProducts
                    food={food}
                    isEdit={false}
                    isVisible={true}
                    key={food.pId}
                    onClick={() => { return setOpenProductModal(!openProductModal) }}
                  />
                </a>
              </Link>
            </div>
          )
        })}
      </Row>
    </Column>
  )
}

ItMayInterestYou.propTypes = {
  PRODUCT_NAME_COOKIE: PropTypes.string
}
