import PropTypes from 'prop-types'
import {
  useRef,
  useMemo,
  useState
} from 'react'
import {
  SearchBar,
  ModalProduct,
  Button,
  Text,
  BannerStore,
  Rate
} from 'pkg-components'
import { StickyViewport } from './stickyheader'
import {
  ButtonLike,
  Container,
  ContentSearch
} from './styled'
import {
  useStatusOpenStore,
  useBanner,
  getCategoriesWithProduct,
  useSchedules
} from 'npm-pkg-hook'
import { ProductCategories } from './StickyBoundaryCategories'
import { RatingModal } from './RatingModal'

export const RestaurantProfile = ({
  addFav = () => { },
  getOneProduct = () => { },
  handleAddProducts = () => { },
  handleGetRating = () => { },
  handleRating = () => { },
  removeFav = () => { },
  SetAppearance = () => { },
  setComments = () => { },
  setGoodCondition = () => { },
  setGoodTemperature = () => { },
  setAlertBox = () => { },
  setOpenModalProduct = () => { },
  setQuantity = () => { },
  setRatingStar = () => { },
  setRatingState = () => { },
  setState = () => { },
  handleAddSubExtraOptionalProduct = () => { },
  setTasty = () => { },
  comments = '',
  data = {},
  productProps = {},
  dataRating = {},
  dataCatProducts = [],
  dataMinPedido = '',
  dataOneFav = {},
  product = {},
  id,
  isMobile = false,
  openModalProduct = false,
  quantity = 1,
  rating
}) => {
  // CUSTOM HOOK
  const [openRate, setOpenRate] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const section1Ref = useRef()
  const {
    ratings,
    setRatings
  } = dataRating || {}

  const {
    rGoodTemperature,
    rGoodCondition,
    rTasty,
    appearance
  } = ratings ?? {}

  const { fState } = dataOneFav

  const containerStyle = {
    height: '100vh'
  }

  const handleSetRating = () => {
    setOpenRate(!openRate)
    handleGetRating(id)
  }
  const idStore = data.idStore ?? id
  const [banner] = useBanner()
  const [dataSchedules] = useSchedules({ schDay: 1, idStore })
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
    openNow,
    open,
    banner,
    isEdit: false
  }

  const ratingModalProps = {
    data,
    rTasty,
    appearance,
    rGoodTemperature,
    rGoodCondition,
    setRatings,
    handleRating,
    setOpenRate,
    openRate,
    id
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
        <ContentSearch>
          <div className='container-rating' style={{ width: '50%' }}>
            <Button className='rating-store' onClick={() => { return handleSetRating() }}>
              <Text>
                Calificar Restaurante
              </Text>
            </Button>
            <div style={{ width: 'min-content' }}>
              <Rate
                onRating={rate => {
                  setRatingState(rate)
                  setRatingStar({
                    variables: {
                      data: {
                        idStore: data?.idStore || '',
                        rScore: rate
                      }
                    }
                  })
                }}
                rating={rating}
                size={20}
              />
            </div>
          </div>
          <div className='container-rating' style={{ width: '50%', justifyContent: 'end' }}>
            {!!dataMinPedido &&
              <Text
                className='text-favorite'
                margin='0 10px'
                size='15px'
              >
                Precio de Producto mínimo $ {dataMinPedido}
              </Text>
            }

            <Text className='text-favorite'>
              {fState === 1 ? 'Elimina de' : 'Añade de '} tus favoritos
            </Text>
            <ButtonLike
              isLiked={fState === 1}
              onClick={() => {
                return fState === 1
                  ? removeFav(data?.idStore, fState)
                  : addFav(data?.idStore)
              }}
            >
            </ButtonLike>
          </div>
        </ContentSearch>

        <ContentSearch>
          <SearchBar
            handleChange={handleChange}
            margin='20px 0'
            padding='0'
            placeholder='Buscar productos'
          />
        </ContentSearch>
        <ProductCategories
          data={categoriesWithProduct}
          handleGetOneProduct={getOneProduct}
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
  handleGetRating: PropTypes.func,
  handleRating: PropTypes.func,
  id: PropTypes.any,
  isMobile: PropTypes.bool,
  openModalProduct: PropTypes.shape({
    setState: PropTypes.func,
    state: PropTypes.any
  }),
  product: PropTypes.object,
  productProps: PropTypes.object,
  quantity: PropTypes.number,
  rGoodCondition: PropTypes.any,
  rGoodTemperature: PropTypes.any,
  rTasty: PropTypes.any,
  rating: PropTypes.any,
  removeFav: PropTypes.func,
  setAlertBox: PropTypes.func,
  setComments: PropTypes.func,
  setGoodCondition: PropTypes.func,
  setGoodTemperature: PropTypes.func,
  setOpenModalProduct: PropTypes.func,
  setQuantity: PropTypes.func,
  setRatingStar: PropTypes.func,
  setRatingState: PropTypes.func,
  setState: PropTypes.func,
  setTasty: PropTypes.func,
  state: PropTypes.any
}
