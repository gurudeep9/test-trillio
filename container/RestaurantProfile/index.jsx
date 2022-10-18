import { useQuery, useSubscription } from '@apollo/client'
import { Skeleton } from 'components/Skeleton'
import { GET_STATE_ORDER } from 'container/checkout/queries'
import moment from 'moment'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import { copyToClipboard, numberFormat } from 'utils'
import { AwesomeModal } from '../../components/AwesomeModal'
import InputHooks from '../../components/InputHooks/InputHooks'
import { Rate } from '../../components/Rate'
import { RippleButton } from '../../components/Ripple'
import {
  APColor,
  BGColor,
  PLColor,
  WColor
} from '../../public/colors'
import {
  IconDisLike, IconEnlace, IconFacebook, IconLike, IconMiniCheck,
  IconPlus, IconRate, IconTicker, IconTwitter, IconWhatsApp
} from '../../public/icons'
import { GET_ONE_SCHEDULE_STORE } from '../queries'
import { Story } from '../story'
import CardProduct from './CardProducts'
import {
  Sticky,
  StickyBoundary,
  StickyViewport
} from './stickyheader'
import {
  ActionButton, ButtonLike,
  CardItemRating, CardProductsModal, CardsComponent, Container,
  ContainerCarrusel, ContainerShare, ContentCategoryProducts, ContentInfo, ContentSearch, ContentShare, CtnItemFilter, DisRestaurant, Flex, GarnishChoicesHeader, HeadSticky, MerchantBannerWrapperInfo, Text, Title
} from './styled'
import SvgComponent from './svg'
export const RestaurantProfile = ({
  src,
  more,
  setMore,
  id,
  dataProductAndCategory,
  errorForm,
  path,
  fetchMore,
  handlerShare,
  share,
  setShare,
  dataMinPedido,
  stars,
  rGoodTemperature,
  rTasty,
  appearance,
  setRatingState,
  setRatingStar,
  dataRating,
  rating,
  rGoodCondition,
  handleGetRating,
  setGoodCondition,
  setTasty,
  setGoodTemperature,
  SetAppearance,
  RemoveFav,
  like,
  setLike,
  dataForm,
  handleChange,
  handleRating,
  addFav,
  dataOneFav,
  data,
  dataCatProducts,
  refs,
  refInterSection,
  SET_OPEN_PRODUCT,
  setState,
  getOneProduct,
  dataOneProduct,
  dataOptional,
  handleCountProducts,
  handleAddProducts,
  state,
  increase,
  decrease,
  handleChangeClickOnTable
}) => {
  const { pName, getStore, ProImage, ProPrice, ProDescription, ProDescuento, ExtProductFoodsAll } = dataOneProduct || {}
  const { fState } = dataOneFav
  const containerStyle = {
    height: '100vh'
    // overflowY: 'auto',
  }
  const handleChangeLol = ({ target, type }) => {
    if (type === 'stuck') {
      target.style.BorderBottom = '1px solid'
    } else {
      target.style.backgroundColor = BGColor
      target.style.BorderBottom = '1px solid'
    }
  }
  const handleUnstuck = target => {
    // target.style.backgroundColor = BGColor
    target.style.boxShadow = ''
  }
  const handleStuck = target => {
    target.style.boxShadow = '0 6px 10px 0 rgba(0, 0, 0, 0.14)'
  }
  const section1Ref = useRef()
  const stickySectionElements = Array.from(dataCatProducts)?.map((x, key) => {
    return (
      <div key={key}>
        <StickyBoundary
          onChange={handleChangeLol}
          onStuck={handleStuck}
          onUnstuck={handleUnstuck}
        >
          <Sticky
            as='h1'
            id={key}
            name={x.pName}
            ref={x.section1Ref}
          >
            <ContentSearch>
              <Title size='.9em'>{x.pName}</Title>
            </ContentSearch>
          </Sticky>
          <ContainerCarrusel >
            {x.productFoodsAll?.length
              ? x.productFoodsAll.map(food => {
                return (
                  <CardProduct
                    food={food}
                    key={food.pId}
                    onClick={() => { return getOneProduct(food) }}
                  />
                )
              })
              : <Skeleton height={200} numberObject={2} />}
          </ContainerCarrusel>
        </StickyBoundary>
        {/* <ScrollNav navHeader={Nav || []} /> */}
      </div>)
  }
  )
  const Nav = dataCatProducts?.map((x, key) => { return { headerTitle: x.pName, headerID: `${key}`, headerRef: section1Ref } })
  const [hour, setHour] = useState(null)
  const [day, setDay] = useState()
  const [open, setOpen] = useState(false)
  const { data: dataSchedule } = useQuery(GET_ONE_SCHEDULE_STORE, { variables: { schDay: day, idStore: id } })
  const { data: dataScheduleTomorrow } = useQuery(GET_ONE_SCHEDULE_STORE, { variables: { schDay: day, idStore: id } })
  useEffect(() => {
    const date = new Date().getTime()
    const dateDay = new Date().getUTCDay()
    setDay(dateDay)
    setHour(moment(date).format('hh:mm'))
    const { getOneStoreSchedules } = dataSchedule || {}
    const { schDay, schHoEnd, schHoSta } = getOneStoreSchedules || {}
    const endTime = moment(`${schHoEnd}:00`, 'HH:mm:ss').format('hh:mm')
    const starTime = moment(`${schHoSta}:00`, 'HH:mm:ss').format('hh:mm')
    if (moment(starTime).isAfter(endTime)) {
      setOpen(true)
    }
  }, [dataSchedule, dataScheduleTomorrow])
  const [OpenRate, setOpenRate] = useState(false)
  const au = useRef()
  const { data: dataWS } = useSubscription(GET_STATE_ORDER)
  const hidden = () => {
    SET_OPEN_PRODUCT.setState(!SET_OPEN_PRODUCT.state)
    setState(1)
  }
  const handleSetRating = () => {
    setOpenRate(!OpenRate)
    handleGetRating(id)
  }
  return (
    <Container>
      <div>
        {dataWS?.numberIncremented}
      </div>
      {/* <button onClick={() => au.current.play()}>Click</button>
            <button onClick={() => au.current.pause()}>Pause</button> */}
      <audio id='a1' ref={au}>
        <source src='https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3' type='audio/mpeg' />
                Your browser does not support the audio element.
      </audio>
      <StickyViewport as='main' style={containerStyle}>
        <MerchantBannerWrapperInfo bannerImage={(path || src) ? `url(${path || src})` : `url("/images/DEFAULTBANNER.png")`}>
          <span>
            <SvgComponent />
          </span>
          <div className='merchant-banner__status-description' data-test-id='merchant-banner-status-description'>
            <h2 className='merchant-banner__status-title'>{data?.storeName}</h2>
            <h2 className='merchant-banner__status-title'>{open && 'Restaurante  cerrado'}</h2>
            <h3 className='merchant-banner__status-message'>{open ? `Abre mañana a las ${dataScheduleTomorrow?.getOneStoreSchedules?.schHoSta}` : null}</h3>
          </div>
        </MerchantBannerWrapperInfo>
        <ContentSearch>
          <Flex>
            <span>
              <img className='store_image' src={data.Image} />
              <Flex>
                <Title>{data?.storeName}</Title>
                <IconRate color={WColor} size={30} />
                <Text size='20px'>{stars}</Text>
              </Flex>
            </span>
            {!!dataMinPedido && <Text margin='0 10px' size='15px'>Pedido mínimo $ {dataMinPedido}</Text>}
          </Flex>
          <div>
            <ButtonLike isLiked={fState === 1} onClick={() => { return fState === 1 ? RemoveFav(data?.idStore, fState) : addFav(data?.idStore) }}>
            </ButtonLike>
          </div>
          <button onClick={() => { return handleSetRating() }}><Text>Calificar Restaurante</Text> </button>
          <Story idStore={id} />
          <AwesomeModal
            borderRadius='10px'
            footer={false}
            header={false}
            onCancel={() => { return setOpenRate(!OpenRate) }}
            onHide={() => { return setOpenRate(!OpenRate) }}
            padding='20px'
            show={OpenRate}
            size='medium'
            zIndex='999'
          >
            <Text>Calificar Restaurante</Text>
            <Flex>
              <CardItemRating>
                <Text>Buen sabor</Text>
                <CtnItemFilter >
                  <IconTicker size='30px' />
                </CtnItemFilter>
                <div className='option'>
                  <button onClick={() => { return setTasty(1) }}>
                    <IconLike size='30px' />
                  </button>
                  {rTasty}
                  <button onClick={() => { return setTasty(0) }}>
                    <IconDisLike size='30px' />
                  </button>
                </div>
              </CardItemRating>
              <CardItemRating>
                <Text>Buena apariencia</Text>
                <CtnItemFilter >
                  <IconTicker size='30px' />
                </CtnItemFilter>

                <div className='option'>
                  <button onClick={() => { return SetAppearance(1) }}>
                    <IconLike size='30px' />
                  </button>
                  {appearance}
                  <button onClick={() => { return SetAppearance(0) }}>
                    <IconDisLike size='30px' />
                  </button>
                </div>
              </CardItemRating>
              <CardItemRating>
                <Text>Buena temperatura</Text>
                <CtnItemFilter >
                  <IconTicker size='30px' />
                </CtnItemFilter>

                <div className='option'>
                  <button onClick={() => { return setGoodTemperature(1) }}>
                    <IconLike size='30px' />
                  </button>
                  {rGoodTemperature}
                  <button onClick={() => { return setGoodTemperature(0) }}>
                    <IconDisLike size='30px' />
                  </button>
                </div>
              </CardItemRating>
              <CardItemRating>
                <Text>Buenas condiciones</Text>
                <CtnItemFilter >
                  <IconTicker size='30px' />
                </CtnItemFilter>

                <div className='option'>
                  <button onClick={() => { return setGoodCondition(1) }}>
                    <IconLike size='30px' />
                  </button>
                  {rGoodCondition}
                  <button onClick={() => { return setGoodCondition(0) }}>
                    <IconDisLike size='30px' />
                  </button>
                </div>
              </CardItemRating>

            </Flex>
            <Rate
              onRating={rate => {
                setRatingState(rate)
                setRatingStar({
                  variables: {
                    data: {
                      idStore: id,
                      rScore: rate
                    }
                  }
                })
              }}
              rating={rating}
              size={20}
            />
            <RippleButton
              color={BGColor}
              margin='0px'
              onClick={() => { return handleRating(id) }}
              padding='0px'
              widthButton='100%'
            >Subir</RippleButton>
          </AwesomeModal>
          <InputHooks
            errors={errorForm?.search}
            name='search'
            onChange={handleChange}
            placeholder='Buscar en el menu'
            required
            value={dataForm?.search}
          />
        </ContentSearch>
        <ContainerCarrusel>
        </ContainerCarrusel>
        {stickySectionElements}
      </StickyViewport>
      <ContentCategoryProducts>
      </ContentCategoryProducts>
      <AwesomeModal
        borderRadius='10px'
        btnCancel={true}
        btnConfirm={false}
        footer={false}
        header={true}
        onCancel={() => { return false }}
        onHide={() => { return hidden() }}
        padding='20px'
        show={SET_OPEN_PRODUCT.state}
        size='medium'
        zIndex='999'
      >
        <CardProductsModal>
          <div>
            <Image
              alt='Picture'
              blurDataURL='data:...'
              className='store_image'
              height={450}
              objectFit='contain'
              placeholder='blur'
              src={ProImage || '/images/hamb.jpg'}
              width={450}
            />
          </div>
          <ContentInfo>
            <HeadSticky>
              <Text size='1.1em'>{pName}</Text>
              <Text size='1.1em'>Cantidad: {state} </Text>
            </HeadSticky>
            <Text
              color='#676464'
              margin='20px 0'
              size='14px'
            >{ProDescription}</Text>
            <Flex>
              <Text
                color={APColor}
                margin='12px 0'
                size='.875rem'
              >$ {numberFormat(ProPrice)}</Text>
              <Text
                color={PLColor}
                margin='12px 0 0 5px'
                size='14px'
                style={{ textDecoration: 'line-through' }}
              >$ {numberFormat(ProDescuento)}</Text>
            </Flex>
            <DisRestaurant>
              <Text
                className='dish-restaurant__header'
                margin='12px 0'
                size='14px'
              > {getStore?.storeName}</Text>
              <div className='dish-restaurant__divisor'></div>
              <label
                className='dish-observation-form__label'
                htmlFor='observations-form'
                tabIndex='0'
              >¿Algún comentario?</label>
            </DisRestaurant>
            <InputHooks
              TypeTextarea
              errors={errorForm?.comments}
              name='comments'
              onChange={handleChange}
              required
              value={dataForm?.comments}
            />
            {ExtProductFoodsAll?.length > 0 && <GarnishChoicesHeader>
              <div>
                <p className='garnish-choices__title'>Adicionales</p>
                <p className='garnish-choices__title-desc'>Escoge hasta opciones.</p>
              </div>
              <IconMiniCheck color={'#009b3a'} size={'15px'} />
            </GarnishChoicesHeader>}
            {ExtProductFoodsAll?.map(extra => {
              return (
                <CardsComponent key={extra.exPid}>
                  <div>
                    <h3 className='title_card'>{extra.extraName}</h3>
                    <h3 className='price'> $ {extra.extraPrice}</h3>
                  </div>
                  <RippleButton
                    bgColor={'transparent'}
                    margin='0px'
                    onClick={() => { }}
                    type='button'
                    widthButton='min-content'
                  >
                  </RippleButton>
                </CardsComponent>
              )
            })}
            {dataOptional?.map((itemOptional, index) => {
              return (
                <div key={index}>
                  <GarnishChoicesHeader key={itemOptional.opExPid}>
                    <div>
                      <p className='garnish-choices__title'>{itemOptional.OptionalProName}</p>
                      <p className='garnish-choices__title-desc'>Escoge hasta {itemOptional.numbersOptionalOnly} opciones.</p>
                    </div>
                    <IconMiniCheck color={'#009b3a'} size={'15px'} />
                  </GarnishChoicesHeader>
                  {itemOptional?.ExtProductFoodsSubOptionalAll?.map(x => {
                    return (
                      <CardsComponent key={x.opSubExPid}>
                        <div>
                          <h3 className='title_card'>{x.OptionalSubProName}</h3>
                        </div>
                        <input
                          id='cat'
                          name='subOptional'
                          onChange={handleChangeClickOnTable}
                          type='checkbox'
                          value={x?.opSubExPid}
                        />
                        <RippleButton
                          bgColor={'transparent'}
                          margin='0px'
                          onClick={() => { return {} }}
                          type='button'
                          widthButton='min-content'
                        >
                        </RippleButton>
                      </CardsComponent>
                    )
                  })}
                </div>
              )
            })}
          </ContentInfo>
          <div>
            {/* <QRCode value={share || ''} /> */}
            <ContentShare>
                            compartir
              <ContainerShare>
                <div>
                  <button onClick={() => { return handlerShare(1) }}>Generar Código QR</button>
                </div>
                <Flex>
                  <div className='icon-face'>
                    <IconFacebook color={BGColor} size='20px' />
                  </div>
                  <button onClick={() => { return handlerShare(2) }}>Compartir en Facebook </button>
                </Flex>
                <Flex>
                  <div className='icon-WhatsApp'>
                    <IconWhatsApp color={BGColor} size='20px' />
                  </div>
                  <button onClick={() => { return handlerShare(3) }}> Compartir en WhatsApp</button>
                </Flex>
                <Flex>
                  <div style={{ width: 'min-content' }}>
                    <IconTwitter color={'#00acee '} size='20px' />
                  </div>
                  <button onClick={() => { return handlerShare(4) }}> Compartir en Twitter</button>
                </Flex>
                <Flex>
                  <div style={{ width: 'min-content' }}>
                    <IconEnlace size='20px' />
                  </div>
                  <button onClick={() => { return copyToClipboard(share) }}>Copiar enlace</button>
                </Flex>
              </ContainerShare>
            </ContentShare>
          </div>
          <ActionButton>
            <div>
              <RippleButton
                color={BGColor}
                disabled={state <= 1}
                onClick={() => { return decrease() }}
              >-</RippleButton>
              <RippleButton color={BGColor}> {handleCountProducts(ProPrice, state)}</RippleButton>
              <RippleButton color={BGColor} onClick={() => { return increase() }}><IconPlus color={BGColor} size='15px' /></RippleButton>
            </div>
            <RippleButton color={BGColor} onClick={() => { return handleAddProducts(dataOneProduct) }}>Agregar</RippleButton>
          </ActionButton>
        </CardProductsModal>
      </AwesomeModal>
    </Container>)
}

RestaurantProfile.propTypes = {
  RemoveFav: PropTypes.func,
  SET_OPEN_PRODUCT: PropTypes.shape({
    setState: PropTypes.func,
    state: PropTypes.any
  }),
  SetAppearance: PropTypes.func,
  addFav: PropTypes.func,
  appearance: PropTypes.any,
  data: PropTypes.shape({
    Image: PropTypes.any,
    idStore: PropTypes.any,
    storeName: PropTypes.any
  }),
  dataCatProducts: PropTypes.shape({
    map: PropTypes.func
  }),
  dataForm: PropTypes.shape({
    comments: PropTypes.any,
    search: PropTypes.any
  }),
  dataMinPedido: PropTypes.any,
  dataOneFav: PropTypes.shape({
    fState: PropTypes.number
  }),
  dataOneProduct: PropTypes.object,
  dataOptional: PropTypes.shape({
    map: PropTypes.func
  }),
  dataProductAndCategory: PropTypes.any,
  dataRating: PropTypes.any,
  decrease: PropTypes.func,
  errorForm: PropTypes.shape({
    comments: PropTypes.any,
    search: PropTypes.any
  }),
  fetchMore: PropTypes.any,
  getOneProduct: PropTypes.func,
  handleAddProducts: PropTypes.func,
  handleChange: PropTypes.any,
  handleChangeClickOnTable: PropTypes.any,
  handleCountProducts: PropTypes.func,
  handleGetRating: PropTypes.func,
  handleRating: PropTypes.func,
  handlerShare: PropTypes.func,
  id: PropTypes.any,
  increase: PropTypes.func,
  like: PropTypes.any,
  more: PropTypes.any,
  path: PropTypes.any,
  rGoodCondition: PropTypes.any,
  rGoodTemperature: PropTypes.any,
  rTasty: PropTypes.any,
  rating: PropTypes.any,
  refInterSection: PropTypes.any,
  refs: PropTypes.any,
  setGoodCondition: PropTypes.func,
  setGoodTemperature: PropTypes.func,
  setLike: PropTypes.any,
  setMore: PropTypes.any,
  setRatingStar: PropTypes.func,
  setRatingState: PropTypes.func,
  setShare: PropTypes.any,
  setState: PropTypes.func,
  setTasty: PropTypes.func,
  share: PropTypes.any,
  src: PropTypes.any,
  stars: PropTypes.any,
  state: PropTypes.number
}
