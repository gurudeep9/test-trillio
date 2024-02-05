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
  const { name } = location.query || {}
  const id = name ? name[name?.length - 1] : null
  const [rating, setRating] = useState(0)

  const { handleQuery } = useManageQueryParams({
    location
  })

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
    location,
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

  const [setMuateRating] = useMutation(SET_RATING_STORE)

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
    return setMuateRating({
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
  const [active, setActive] = useState(0)
  const [overActive, setOverActive] = useState(0)
  const [show, setShow] = useState(true)

  const handleClose = () => {
    setShow(!show)
  }

  const handleOverActive = (index) => {
    setOverActive(index)
  }

  const restaurantProps = {
    appearance,
    handleClose,
    setActive,
    active,
    show,
    overActive,
    handleOverActive,
    setShow,
    comments,
    data: data || {},
    dataCatProducts: dataProductAndCategory || [],
    dataMinPedido: numberFormat(dataMinPedido?.getMinPrice),
    dataOneFav: dataOneFav?.getOneFavorite || {},
    dataOneProduct: dataOneProduct || {},
    dataRating,
    fetchMore,
    getOneProduct,
    handleAddProducts,
    handleQuery,
    id,
    like,
    loading,
    name: '',
    openModalProduct,
    product,
    productProps,
    quantity,
    rating,
    setAlertBox,
    setOpenModalProduct,
    addFav,
    handleGetRating,
    handleRating,
    removeFav,
    setLike,
    setRating,
    setRatingStar
  }
  const {
    storeName,
    city,
    department
  } = data || {
    storeName: '',
    city: {
      cName: ''
    },
    department: {
      dName: ''
    }
  }
  return (
    <div>
      {id && <Head>
        <title>Delivery - {storeName || ''} - {city?.cName || ''} - {department?.dName || ''}</title>
        <meta content={location.query.name} name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>}
      {data?.getOneStore?.uState !== '1'
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
        storeUserId: storeUserId || '',
        idStore: id || ''
      }
    }
  } catch (error) {
    return {}
  }
},
cookie
)
