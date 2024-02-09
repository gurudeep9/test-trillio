import PropTypes from 'prop-types'
import { useRef, useMemo, useState, useEffect } from 'react'
import {
  SearchBar,
  ModalProduct,
  LateralStoreInfo,
  BannerStore
} from 'pkg-components'
import { StickyViewport } from './stickyheader'
import { Container, ContentSearch } from './styled'
import {
  useStatusOpenStore,
  useBanner,
  getCategoriesWithProduct,
  completeSchedules,
  useSchedules
} from 'npm-pkg-hook'
import { ProductCategories } from './StickyBoundaryCategories'
import { RatingModal } from './RatingModal'

export const RestaurantProfile = ({
  addFav = () => {},
  getOneProduct = () => {},
  handleClose = () => {},
  handleOverActive = () => {},
  handleQuery = () => {},
  handleRating = () => {},
  removeFav = () => {},
  setActive = () => {},
  setRating = () => {},
  setRatingStar = () => {},
  active = 0,
  show = false,
  overActive = 0,
  data = {},
  productProps = {},
  dataRating = {},
  dataCatProducts = [],
  dataMinPedido = '',
  dataOneFav = {},
  id,
  isMobile = false,
  rating
}) => {
  // CUSTOM HOOK
  console.log(dataMinPedido)
  const [openRate, setOpenRate] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const section1Ref = useRef()
  const {
    ratings,
    setRatings
  } = dataRating || {
    ratings: {},
    setRatings: () => {}
  }

  const {
    rGoodTemperature,
    rGoodCondition,
    rTasty,
    appearance
  } = ratings ?? {
    rGoodTemperature: 0,
    rGoodCondition: 0,
    rTasty: 0,
    appearance: 0
  }

  const { fState } = dataOneFav

  const containerStyle = {
    height: '100%'
  }

  const idStore = data.idStore ?? id
  const [banner] = useBanner()
  const [dataSchedules] = useSchedules({ schDay: 1, idStore })
  const schedulesStore = completeSchedules(dataSchedules || [])
  const { path, bnImageFileName } = banner || {}
  const { open, openNow } = useStatusOpenStore({ dataSchedules })
  const isEmtySchedules = dataSchedules?.length === 0
  const bannerProps = {
    path,
    bnImageFileName,
    isLoading: false,
    isMobile,
    store: data,
    isEmtySchedules,
    open: data?.scheduleOpenAll ? 'Abierto todos los días' : open,
    openNow: data?.scheduleOpenAll ? true : openNow,
    banner,
    isEdit: false,
    handleClose
  }

  const ratingModalProps = {
    appearance,
    data,
    id,
    openRate,
    rGoodCondition,
    rGoodTemperature,
    rTasty,
    setRatings,
    handleRating,
    setOpenRate
  }
  const handleChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const categoriesWithProduct = useMemo(() => {
    if (searchQuery.trim() === '') {
      return dataCatProducts
    }
    return getCategoriesWithProduct(dataCatProducts, searchQuery)
  }, [dataCatProducts, searchQuery])

  return (
    <Container>
      <StickyViewport as='main' style={containerStyle}>
        <BannerStore {...bannerProps} />
        <LateralStoreInfo
          active={active}
          addFav={addFav}
          fState={fState}
          handleClose={handleClose}
          handleOverActive={handleOverActive}
          idStore={idStore}
          overActive={overActive}
          rating={rating}
          removeFav={removeFav}
          schedulesStore={schedulesStore || []}
          setActive={setActive}
          setRating={setRating}
          setRatingStar={setRatingStar}
          show={show}
          steps={['Sobre', 'Horarios', '']}
        />
        <ContentSearch>
          <SearchBar
            handleChange={handleChange}
            margin='20px 0'
            padding='10px'
            placeholder='Buscar productos'
          />
        </ContentSearch>
        <ProductCategories
          data={categoriesWithProduct}
          handleGetOneProduct={(food) => {
            handleQuery('plato', food.pId)
            getOneProduct(food)
          }}
          reference={section1Ref}
        />
      </StickyViewport>
      <ModalProduct {...productProps} />
      <RatingModal {...ratingModalProps} />
    </Container>
  )
}

RestaurantProfile.propTypes = {
  SetAppearance: PropTypes.func,
  active: PropTypes.number,
  addFav: PropTypes.func,
  appearance: PropTypes.any,
  comments: PropTypes.string,
  data: PropTypes.shape({
    idStore: PropTypes.string,
    storeName: PropTypes.string
  }),
  dataCatProducts: PropTypes.shape({
    map: PropTypes.func
  }),
  dataForm: PropTypes.shape({
    search: PropTypes.any
  }),
  dataMinPedido: PropTypes.string,
  dataOneFav: PropTypes.shape({
    fState: PropTypes.number
  }),
  dataOneProduct: PropTypes.object,
  dataOptional: PropTypes.array,
  dataRating: PropTypes.object,
  errorForm: PropTypes.shape({
    search: PropTypes.any
  }),
  getOneProduct: PropTypes.func,
  handleAddProducts: PropTypes.func,
  handleAddSubExtraOptionalProduct: PropTypes.func,
  handleClose: PropTypes.func,
  handleGetRating: PropTypes.func,
  handleOverActive: PropTypes.func,
  handleQuery: PropTypes.func,
  handleRating: PropTypes.func,
  id: PropTypes.any,
  isMobile: PropTypes.bool,
  loadingProduct: PropTypes.bool,
  openModalProduct: PropTypes.shape({
    setState: PropTypes.func,
    state: PropTypes.any
  }),
  overActive: PropTypes.number,
  product: PropTypes.object,
  productProps: PropTypes.object,
  quantity: PropTypes.number,
  rGoodCondition: PropTypes.any,
  rGoodTemperature: PropTypes.any,
  rTasty: PropTypes.any,
  rating: PropTypes.any,
  removeFav: PropTypes.func,
  setActive: PropTypes.func,
  setAlertBox: PropTypes.func,
  setComments: PropTypes.func,
  setGoodCondition: PropTypes.func,
  setGoodTemperature: PropTypes.func,
  setOpenModalProduct: PropTypes.func,
  setQuantity: PropTypes.func,
  setRating: PropTypes.func,
  setRatingStar: PropTypes.func,
  setState: PropTypes.func,
  setTasty: PropTypes.func,
  show: PropTypes.bool,
  state: PropTypes.any
}
