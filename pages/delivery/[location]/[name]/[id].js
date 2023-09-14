import PropTypes from 'prop-types'
import Head from 'next/head'
import React, {
  useContext,
  useState
} from 'react'
import {
  useMutation,
  useQuery
} from '@apollo/client'
import { withIronSessionSsr } from 'iron-session/next'
import { useRouter } from 'next/router'
import {
  GET_ONE_FAV_STORE,
  SET_FAVORITES_STORE,
  SET_START_STORE
} from 'container/profile/queries'
import { SET_RATING_STORE } from 'container/queries'
import { RestaurantProfile } from 'container/RestaurantProfile'
import { Context } from 'context'
import NotFount from 'components/404'
import {
  cookie,
  updateCache
} from 'utils'
import {
  useGetMinPrice,
  useCatWithProductClient,
  useCart,
  useGetOneStoreRating,
  numberFormat,
  useManageQueryParams,
  useStore
} from 'npm-pkg-hook'

export default function StoreHomeView ({ idStore }) {
  // STATES
  const location = useRouter()
  const { name, id } = location.query || {}
  const locationName = location.query.location
  const [rating, setRatingState] = useState(0)
  const { handleQuery } = useManageQueryParams()

  const [like, setLike] = useState(0)
  const {
    setAlertBox,
    handleMenu,
    setOpenModalProduct,
    openModalProduct
  } = useContext(Context)
  const idCurrentStore = idStore || id
  // CUSTOM HOOKS
  const [dataMinPedido] = useGetMinPrice({ idStore: idCurrentStore })
  const [dataProductAndCategory, { fetchMore }] = useCatWithProductClient(idCurrentStore)
  const [data, { loading }] = useStore({ isClient: true, idStore: idCurrentStore })
  const {
    handleAddProducts,
    quantity,
    setComments,
    comments,
    loading: loadingProduct,
    dataOptional,
    dataExtra,
    dataOneProduct,
    getOneProduct,
    handleIncrease,
    handleDecrease,
    handleShowModalProduct,
    handleIncrementExtra,
    handleDecrementExtra,
    handleAddOptional,
    disabled,
    handleCountProducts
  } = useCart({
    handleMenu,
    openModalProduct,
    setOpenModalProduct
  })

  const productProps = {
    handleAddProducts,
    handleIncrementExtra,
    handleDecrementExtra,
    show: openModalProduct,
    quantity,
    disabled,
    handleAddOptional,
    handleIncrease,
    handleDecrease,
    openModalProduct,
    loading: loadingProduct,
    handleMenu,
    setComments,
    comments,
    dataOptional,
    dataExtra,
    dataOneProduct,
    getOneProduct,
    setOpenModalProduct,
    handleCountProducts,
    handleShowModalProduct
  }

  const [setRating] = useMutation(SET_RATING_STORE)

  const {
    ratings,
    getOneRating,
    setRatings
  } = useGetOneStoreRating()

  const {
    rGoodTemperature,
    rGoodCondition,
    rTasty,
    appearance
  } = ratings || {}

  const { data: dataOneFav } = useQuery(GET_ONE_FAV_STORE, {
    variables: {
      idStore: id
    }
  })
  const [setFavorites] = useMutation(SET_FAVORITES_STORE)
  const [setRatingStar] = useMutation(SET_START_STORE)
  const removeFav = (idStore, fState) => {
    return setFavorites({
      variables: {
        data: {
          idStore,
          fState
        }
      },
      update: (cache, { data: { getOneFavorite } }) => {
        return updateCache({
          cache,
          query: GET_ONE_FAV_STORE,
          nameFun: 'getOneFavorite',
          dataNew: getOneFavorite
        })
      }
    }).then(res => {
      setAlertBox({
        message: res?.data?.setFavorites?.message,
        color: !res?.data?.setFavorites?.success ? 'error' : 'success'
      })
    }).catch(e => { return setAlertBox({ message: 'e' }) })
  }


  const handleRating = idStore => {
    return setRating({
      variables: {
        data: {
          idStore,
          rAppearance: appearance,
          rTasty,
          rGoodTemperature,
          rGoodCondition
        }
      }
    }).then(res => {
      setAlertBox({
        message: res?.data?.setRating?.message,
        color: !res?.data?.setRating?.success ? 'error' : 'success'
      })
    }).catch(e => { return setAlertBox({ message: e }) })
  }

  const addFav = idStore => {
    return setFavorites({
      variables: { data: { idStore } },
      update: (cache, { data: { getOneFavorite } }) => {
        return updateCache({
          cache,
          query: GET_ONE_FAV_STORE,
          nameFun: 'getOneFavorite',
          dataNew: getOneFavorite
        })
      }
    })
      .then(res => {
        setAlertBox({
          message: res?.data?.setFavorites?.message,
          color: !res?.data?.setFavorites?.success ? 'error' : 'success'
        })
      })
      .catch(e => { return setAlertBox({ message: e }) })
  }

  const handleGetRating = idStore => {
    return getOneRating({
      variables: {
        idStore
      }
    })
  }

  const product = {
    dataOneProduct,
    dataOptional,
    loading: loadingProduct,
    dataExtra
  }

  const dataRating = {
    ratings,
    getOneRating,
    setRatings
  }

  const restaurantProps = {
    productProps,
    product,
    dataRating,
    appearance,
    comments,
    data: data || {},
    dataCatProducts: dataProductAndCategory || [],
    dataMinPedido: numberFormat(dataMinPedido?.getMinPrice),
    dataOneFav: dataOneFav?.getOneFavorite || {},
    dataOneProduct: dataOneProduct || {},
    fetchMore,
    handleAddProducts,
    id,
    like,
    loading,
    name: name?.replace(/-/g, ' '),
    openModalProduct,
    quantity,
    rating,
    addFav,
    getOneProduct,
    handleGetRating,
    handleRating,
    handleQuery,
    removeFav,
    setLike,
    setAlertBox,
    setOpenModalProduct,
    setRating,
    setRatingStar,
    setRatingState
  }

  return (
    <div>
      <Head>
        <title>Delivery - {name?.toLocaleLowerCase()} - {locationName?.toLocaleLowerCase()} </title>
        <meta content={location.query.name} name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      {(data?.getOneStore && data?.getOneStore?.uState) !== '1'
        ? (
          <RestaurantProfile {...restaurantProps} />
        )
        : (
          <NotFount error='El restaurante esta fuera de servicio' />
        )}
    </div>
  )
}

StoreHomeView.propTypes = {
  idStore: PropTypes.string
}

export const getServerSideProps = withIronSessionSsr(async function getServerSideProps ({ req, res, query: queryRouter }) {
  try {
    const { id } = queryRouter || {}
    const { user } = req.session || {}
    const { storeUserId } = user || {}
    return {
      props: {
        storeUserId,
        idStore: id
      }
    }
  } catch (error) {
    return {}
  }
},
cookie
)
