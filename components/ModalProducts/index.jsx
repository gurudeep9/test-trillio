/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
import { useLazyQuery, useMutation } from '@apollo/client'
import { CREATE_SHOPPING_CARD } from 'components/AsideCheckout/querys'
import { useFormTools, useEvents } from 'npm-pkg-hook'
import { useSetState } from 'components/hooks/useState'
import { InputHooks, RippleButton } from 'pkg-components'
import { GET_EXTRAS_PRODUCT_FOOD_OPTIONAL, GET_ONE_PRODUCTS_FOOD } from 'container/queries'
import { GET_ALL_SHOPPING_CARD } from 'container/restaurantes/queries'
import { Context } from 'context'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  APColor,
  BGColor,
  PColor,
  PLColor
} from 'public/colors'
import {
  IconArrowBottom,
  IconMiniCheck,
  IconPlus
} from 'public/icons'
import {
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react'
import { numberFormat, updateCache } from 'utils'
import {
  BtnClose,
  BtnCloseMobile,
  CardProductsModal,
  CardsComponent,
  ContainerButtonAction,
  ContainerModal,
  ContentInfo,
  DisRestaurant,
  Flex,
  GarnishChoicesHeader,
  Header,
  HeadSticky,
  Modal,
  Text
} from './styled'

export const ModalProduct = () => {
  const router = useRouter()
  // STATES
  const {
    openProductModal,
    setOpenProductModal,
    setAlertBox,
    state_product_card,
    handleMenu,
    isSession,
    handleAdd
  } = useContext(Context)
  const [handleChange, _handleSubmit, _setDataValue, { dataForm, errorForm }] = useFormTools()
  const { increase, state, decrease } = useSetState(1)
  const [filter, setFilter] = useState({ subOptional: [] })
  const [_, setSearchFilter] = useState({ subOptional: [] })

  const location = useRouter()
  const { plato } = location.query
  // QUERIES
  const [productFoodsOne, { data: dataOneProduct }] = useLazyQuery(GET_ONE_PRODUCTS_FOOD)
  const [ExtProductFoodsOptionalAll, { data: dataOptional }] = useLazyQuery(GET_EXTRAS_PRODUCT_FOOD_OPTIONAL)
  const [registerShoppingCard] = useMutation(CREATE_SHOPPING_CARD)

  // EFFECTS
  useEffect(() => {
    if (openProductModal || plato) setOpenProductModal(true)
    productFoodsOne({ variables: { pId: plato } })
    ExtProductFoodsOptionalAll({ variables: { pId: plato } })
    if (!plato) setOpenProductModal(false)
  }, [openProductModal, plato, setOpenProductModal])
  const {
    ProDescription,
    ProImage,
    ProDescuento,
    ProPrice,
    getStore,
    pName,
    ExtProductFoodsAll
  } = dataOneProduct?.productFoodsOne || {}
  /**
     *
     * @param {elem} food obtiene un producto del la list
     * @author {autor} Jesus Juvinao
     * @action Obtiene un producto de DB
     */
  // HANDLES
  const handleChangeClickOnTable = e => {
    const { name, value, checked } = e.target
    !checked ? setFilter(s => { return { ...s, [name]: s[name].filter(f => { return f !== value }) } }) : setFilter({ ...filter, [name]: [...filter[name], value] })
    setSearchFilter({ ...filter })
  }
  const handleAddProducts = (food) => {
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
  }, [dataOneProduct])
  const handleClose = useCallback((e) => {
    e.preventDefault()
    const val = ['/delivery/[location]/[name]/[id]'].find(x => { return x === location.pathname })
    if (val) {
      const { location, name, id } = router.query
      router.replace(`/delivery/${location}/${name}/${id}`)
    } else {
      router.replace(router.pathname)
    }
    setOpenProductModal(!openProductModal)
  }, [openProductModal])

  const handleAddProductsToCart = () => {
    const { pId, ProPrice: price } = dataOneProduct?.productFoodsOne ?? {}
    isSession
      ? handleAddProducts(dataOneProduct?.productFoodsOne)
      : handleAdd({ item: { pId, price } })
  }
  useEvents({
    eventType: 'app.cart',
    callBack: ({ detail: { items } }) => {
      // handleMutate(items)
    }
  })
  return (
    <ContainerModal showModal={openProductModal}>
      <Modal showModal={openProductModal}>
        <CardProductsModal>
          <Header>
            <BtnCloseMobile onMouseDown={(e) => { return handleClose(e) }}><IconArrowBottom color={PColor} size={20} /></BtnCloseMobile>
          </Header>
          <ContentInfo margin='10px 0 0 0'>
            <Image
              alt='Picture'
              blurDataURL='data:...'
              height={450}
              objectFit='contain'
              placeholder='blur'
              src={'/images/hamb.jpg'}
              width={450}
            />
          </ContentInfo>
          <div>
            <div>
              <BtnClose onMouseDown={(e) => { return handleClose(e) }} ><IconArrowBottom color={PColor} size={20} /></BtnClose>
            </div>
            <ContentInfo>
              <HeadSticky>
                <Text size='1.1em'>{pName}</Text>
                <Text size='1.1em'>Cantidad: {state} </Text>
              </HeadSticky>
              <Text
                color='#676464'
                description
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
                <Link href={`/delivery/${getStore?.city?.cName?.toLocaleLowerCase()}-${getStore?.department?.dName?.toLocaleLowerCase()}/${getStore?.storeName}/${getStore?.idStore}`}>
                  <a>
                    <Text
                      className='dish-restaurant__header'
                      margin='12px 0'
                      size='14px'
                    > {getStore?.storeName}</Text>
                  </a>
                </Link>
                <div className='dish-restaurant__divisor'></div>
                <label className='dish-observation-form__label' tabIndex='0'>¿Algún comentario?</label>
              </DisRestaurant>
              <InputHooks
                TypeTextarea
                errors={errorForm?.comments}
                name='comments'
                onChange={handleChange}
                required
                value={dataForm?.comments}
              />
              {!!ExtProductFoodsAll?.length && <GarnishChoicesHeader>
                <div>
                  <p className='garnish-choices__title'>Adicionales</p>
                  <p className='garnish-choices__title-desc'>Escoge hasta opciones.</p>
                </div>
                <IconMiniCheck color={'#009b3a'} size={'15px'} />
              </GarnishChoicesHeader>}
              {ExtProductFoodsAll?.length > 0 && ExtProductFoodsAll?.map(extra => {
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
              {dataOptional?.ExtProductFoodsOptionalAll?.map(itemOptional => {
                return (
                  <div key={itemOptional.opExPid}>
                    <GarnishChoicesHeader>
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
                            onClick={() => { }}
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
          </div>
          <div></div>
          <ContainerButtonAction>
            <Flex>
              <div style={{ width: '50%' }}>
                <RippleButton
                  color={BGColor}
                  disabled={state <= 1}
                  onClick={() => { return decrease() }}
                  padding={'8px'}
                  size='12px'
                >-</RippleButton>
                <RippleButton
                  color={BGColor}
                  padding={'8px'}
                  size='12px'
                > {handleCountProducts(ProPrice, state)}</RippleButton>
                <RippleButton
                  color={BGColor}
                  onClick={() => { return increase() }}
                  padding={'8px'}
                  size='12px'
                ><IconPlus color={BGColor} size='10px' /></RippleButton>
              </div>
              <RippleButton
                color={BGColor}
                onClick={() => { return handleAddProductsToCart() }}
                padding={'8px'}
                size='12px'
              >Agregar</RippleButton>
            </Flex>
          </ContainerButtonAction>
        </CardProductsModal>
      </Modal>

    </ContainerModal >
  )
}

ModalProduct.propTypes = {}
