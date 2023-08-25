/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
import PropTypes from 'prop-types'
import Head from 'next/head'
import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef
} from 'react'
import {
  useLazyQuery,
  useMutation,
  useQuery
} from '@apollo/client'
import { CLIENT_URL_BASE } from 'apollo/urls'
import { PUSH_RECOMMENDED, PUSH_RECOMMENDED_PRODUCT_NAME } from 'gql/Recommendation'
import { withIronSessionSsr } from 'iron-session/next'
import { useRouter } from 'next/router'
import { CREATE_SHOPPING_CARD } from 'components/AsideCheckout/querys'
import { useFormTools } from 'npm-pkg-hook'
import { useSetState } from 'components/hooks/useState'
import {
  GET_ONE_FAV_STORE,
  SET_FAVORITES_STORE,
  SET_START_STORE
} from 'container/profile/queries'
import {
  GET_ALL_CATEGORIES_WITH_PRODUCT,
  GET_ALL_RATING_START_STORE,
  GET_EXTRAS_PRODUCT_FOOD_OPTIONAL,
  GET_MIN_PEDIDO,
  GET_ONE_BANNER_STORE,
  GET_ONE_PRODUCTS_FOOD,
  GET_ONE_RATING_STORE,
  GET_ONE_STORE_BY_ID,
  SET_RATING_STORE
} from 'container/queries'
import { GET_ALL_SHOPPING_CARD } from 'container/restaurantes/queries'
import { RestaurantProfile } from 'container/RestaurantProfile'
import { Context } from 'context'
import NotFount from 'components/404'
import {
  cookie,
  numberFormat,
  updateCache,
  defaultReturnObject
} from 'utils'

export default function HomeView ({ idStore }) {
  // STATES
  const location = useRouter()
  const { name, id } = location.query || {}
  const locationName = location.query.location
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
  const [searchFilter, setSearchFilter] = useState({ subOptional: [] })
  const { setAlertBox, state_product_card, handleMenu } = useContext(Context)
  const [registerShoppingCard] = useMutation(CREATE_SHOPPING_CARD)
  const [setRating] = useMutation(SET_RATING_STORE)
  const [pushOneRecommendation] = useMutation(PUSH_RECOMMENDED, {
    context: { clientName: 'main' }
  })
  const [pushOneRecommendationProduct] = useMutation(PUSH_RECOMMENDED_PRODUCT_NAME, {
    context: { clientName: 'main' }
  })

  const SET_OPEN_PRODUCT = useSetState(false)
  const { increase, setState, state, decrease } = useSetState(1)
  // QUERIES
  const { data, refetch } = useQuery(GET_ONE_STORE_BY_ID, {
    variables: {
      idStore: id || idStore,
      StoreName: name
    }
  })
  const [getAllRatingStar, { data: dataStartStore }] = useLazyQuery(GET_ALL_RATING_START_STORE)
  const [getMinPrice, { data: dataMinPedido }] = useLazyQuery(GET_MIN_PEDIDO)
  const [getOneRating, { data: dataRating }] = useLazyQuery(GET_ONE_RATING_STORE)
  const [productFoodsOne, { data: dataOneProduct }] = useLazyQuery(GET_ONE_PRODUCTS_FOOD)
  const { pId } = dataOneProduct?.productFoodsOne || {}
  const [more, setMore] = useState(100)
  const [ExtProductFoodsOptionalAll, { data: dataOptional }] = useLazyQuery(GET_EXTRAS_PRODUCT_FOOD_OPTIONAL)
  const { data: dataProductAndCategory, fetchMore } = useQuery(GET_ALL_CATEGORIES_WITH_PRODUCT, {
    fetchPolicy: 'network-only',
    variables:
    {
      max: more,
      idStore: id || idStore,
      search: '',
      gender: searchFilter?.gender,
      desc: searchFilter?.desc,
      categories: searchFilter?.subOptional
    }
  })
  // EFFECTS
  useEffect(() => {
    getAllRatingStar({ variables: { idStore: id } })
    getMinPrice({ variables: { idStore: id } })
  }, [dataStartStore, data, dataMinPedido, id, name, location, more])
  const [stars, setStars] = useState(null)
  useEffect(() => {
    let suma = 0
    const avg = dataStartStore?.getAllRatingStar?.map((x, index) => { return (suma += x.rScore) / (index + 1) })
    !!avg && setStars((avg[avg.length - 1])?.toFixed(1))
  }, [dataStartStore])
  // HANDLES

  const getOneProduct = food => {
    const { pName } = food || {}
    SET_OPEN_PRODUCT.setState(!SET_OPEN_PRODUCT.state)
    productFoodsOne({ variables: { pId: food.pId } })
    pushOneRecommendationProduct({ variables: { input: { productName: pName } } })
    ExtProductFoodsOptionalAll({ variables: { pId: food.pId } })
  }
  const [filter, setFilter] = useState({ subOptional: [] })
  const handleChangeClickOnTable = e => {
    const { name, value, checked } = e.target
    !checked ? setFilter(s => { return { ...s, [name]: s[name].filter(f => { return f !== value }) } }) : setFilter({ ...filter, [name]: [...filter[name], value] })
    setSearchFilter({ ...filter })
  }
  const handleAddProducts = food => {
    const val = state_product_card.PRODUCT?.find(x => { return x.pId === food.pId })
    handleMenu(1)
    if (val) {
      setAlertBox({ message: `El producto ${food.pName} ya esta en la cesta` })
    } else {
      const newArray = filter?.subOptional.map(x => { return { _id: x } })
      registerShoppingCard({
        variables: {
          input: {
            cState: 1,
            pId: food.pId,
            idStore: !!food && food.getStore.idStore,
            comments: dataForm.comments,
            cName: 'puta madre',
            cantProducts: state,
            csDescription: 'csDescription'
          },
          idSubArray: {
            setID: newArray || []
          }
        },
        update: (cache, { data: { getAllShoppingCard } }) => {
          return updateCache({
            cache,
            query: GET_ALL_SHOPPING_CARD,
            nameFun: 'getAllShoppingCard',
            dataNew: getAllShoppingCard
          })
        }
      }).catch(err => { return setAlertBox({ message: err }) })
      // dispatch({ type: 'ADD_PRODUCT', payload: result })
    }
  }
  const handleCountProducts = useCallback((ProPrice, state) => {
    const price = parseFloat(ProPrice)
    return state <= 0 ? price : numberFormat((Math.abs(state * price)))
  }, [])

  const refs = useRef([React.createRef(), React.createRef()])
  const refInterSection = useRef(null)

  const { data: dataOneFav } = useQuery(GET_ONE_FAV_STORE, {
    variables: {
      idStore: id
    }
  })
  const [rating, setRatingState] = useState(0)
  const [setFavorites] = useMutation(SET_FAVORITES_STORE)
  const [setRatingStar] = useMutation(SET_START_STORE)
  const RemoveFav = (idStore, fState) => {
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
    }).catch(e => { return setAlertBox({ message: e }) })
  }
  /**
   * RATING
   */
  const [like, setLike] = useState(0)
  const [appearance, SetAppearance] = useState(0)
  const [rTasty, setTasty] = useState(0)
  const [rGoodTemperature, setGoodTemperature] = useState(0)
  const [rGoodCondition, setGoodCondition] = useState(0)
  useEffect(() => {
    SetAppearance(dataRating?.getOneRating?.rAppearance || 0)
    setTasty(dataRating?.getOneRating?.rTasty || 0)
    setGoodTemperature(dataRating?.getOneRating?.rGoodTemperature || 0)
    setGoodCondition(dataRating?.getOneRating?.rGoodCondition || 0)
  }, [dataRating])

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
        refetch({ idStore })
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
  const [share, setShare] = useState(false)
  useEffect(() => {
    setShare(`${CLIENT_URL_BASE}${location.asPath.slice(1, -1)}?plato=${pId}`)
  }, [dataOneProduct, share])

  const handlerShare = index => {
    if (index === 1) {
      setShare(`${CLIENT_URL_BASE}${location.asPath.slice(1, -1)}?food${pId}`)
    }
    if (index === 2) {
      window.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(`${CLIENT_URL_BASE}${location.asPath.slice(1, -1)}?food${pId}`),
        'facebook-share-dialog',
        'width=626,height=436')
    }
    if (index === 3) {
      window.open(`https://api.whatsapp.com/send?text=Mira este producto ${CLIENT_URL_BASE}${location.asPath.slice(1, -1)}?food${pId}?phone=34123456789`)
    }
    if (index === 4) {
      window.open(`https://twitter.com/intent/tweet?text=Mira este producto ${CLIENT_URL_BASE}${location.asPath.slice(1, -1)}?food${pId}`)
    }
  }
  const { data: dataBanner } = useQuery(GET_ONE_BANNER_STORE, {
    context: { clientName: 'admin-server' },
    variables: {
      idStore: id
    }
  })
  const { path } = dataBanner?.getOneBanners || {}
  return (
    <div>
      <Head>
        <title>Delivery - {name?.toLocaleLowerCase()} - {locationName?.toLocaleLowerCase()} </title>
        <meta content={location.query.name} name='description' />
        <link href='/favicon.ico' rel='icon' />
      </Head>
      {(data?.getOneStore && data?.getOneStore?.uState) !== '1'
        ? <RestaurantProfile
          RemoveFav={RemoveFav}
          SET_OPEN_PRODUCT={SET_OPEN_PRODUCT}
          SetAppearance={SetAppearance}
          addFav={addFav}
          appearance={appearance}
          data={data?.getOneStore || {}}
          dataCatProducts={dataProductAndCategory?.getCatProductsWithProductClient || []}
          dataForm={dataForm}
          dataMinPedido={numberFormat(dataMinPedido?.getMinPrice)}
          dataOneFav={dataOneFav?.getOneFavorite || {}}
          dataOneProduct={dataOneProduct?.productFoodsOne || {}}
          dataOptional={dataOptional?.ExtProductFoodsOptionalAll}
          dataProductAndCategory={dataProductAndCategory?.getCatProductsWithProductClient}
          dataRating={dataRating?.getOneRating || {}}
          decrease={decrease}
          errorForm={errorForm}
          fetchMore={fetchMore}
          getOneProduct={getOneProduct}
          handleAddProducts={handleAddProducts}
          handleChange={handleChange}
          handleChangeClickOnTable={handleChangeClickOnTable}
          handleCountProducts={handleCountProducts}
          handleGetRating={handleGetRating}
          handleRating={handleRating}
          handlerShare={handlerShare}
          id={id}
          increase={increase}
          like={like}
          more={more}
          name={name?.replace(/-/g, ' ')}
          path={path}
          rGoodCondition={rGoodCondition}
          rGoodTemperature={rGoodTemperature}
          rTasty={rTasty}
          rating={rating}
          refInterSection={refInterSection}
          refs={refs}
          setGoodCondition={setGoodCondition}
          setGoodTemperature={setGoodTemperature}
          setLike={setLike}
          setMore={setMore}
          setRating={setRating}
          setRatingStar={setRatingStar}
          setRatingState={setRatingState}
          setShare={setShare}
          setState={setState}
          setTasty={setTasty}
          share={share}
          stars={stars}
          state={state}
        />
        : <NotFount
          error='El restaurante esta fuera de servicio'
        />}
    </div>
  )
}

HomeView.propTypes = {
  idStore: PropTypes.any
}
export const getServerSideProps = withIronSessionSsr(async function getServerSideProps ({ req, res, query: queryRouter }) {
  try {
    const { id } = queryRouter || {}
    const { user } = req.session || {}
    const { storeUserId } = user || {}
    const url = `${process.env.URL_BASE}api/graphql`
    const query = `
      query getOneStore($StoreName: String, $idStore: ID){
        getOneStore(idStore: $idStore, StoreName: $StoreName) {
          idStore
          uState
        }
      }
      `
    const variables = {
      idStore: id
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query, variables })
    }).then(response => { return response.json() })
      .then(data => {
        let bool = false
        if (data?.data?.getOneStore?.uState === '1') {
          bool = true
        }
      })
    if (!req.cookies[process.env.SESSION_NAME]) return defaultReturnObject
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
