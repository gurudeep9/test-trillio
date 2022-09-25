import PropTypes from 'prop-types'
import { useState } from 'react'
import { InputHook } from './Input'
import { Rate } from '../../Rate'
import { numberFormat } from '../../../utils'
import { RippleButton } from '../../Ripple'
import {
  Container,
  Card,
  Button,
  CardOne,
  ContainerCardProduct,
  CardProduct,
  Img,
  ContentImg,
  Title,
  Text,
  ContentInfo,
  ContentIconFav,
  ButtonCard,
  ActionName,
  ReadMore,
  ContentProducts,
  CardInput,
  CardCheckBox,
  CardRadioLabel,
  ContainerFilter,
  ItemFilter,
  ContainerBurger,
  Footer
} from './styled'
import { Skeleton } from '../../Skeleton/SkeletonCard'
import { SliderAreas } from './SliderAreas'
import { LoadingBabel } from '../../Loading/LoadingBabel'
import { Range } from '../../InputRange'
import {
  IconArrowRight,
  IconDelete,
  IconEdit,
  IconLove
} from '../../../public/icons'
import {
  APColor,
  PColor,
  PVColor
} from '../../../public/colors'
import { FoodCardPreview } from './FoodPreview'

export const FoodComponent = ({
  finalDataAreas,
  features,
  search,
  handleChangeFilter,
  data,
  setShowMore,
  values,
  handleRegister,
  handleChange,
  countries,
  setRating,
  rating,
  names,
  loading,
  onTargetClick,
  onFileInputChange,
  handleDelete,
  fileInputRef,
  alt,
  src,
  setName,
  handleChangeClick,
  onClickClear,
  handleCheckEnvioGratis,
  onClickSearch,
  state: grid,
  setLocalStorage,
  intPorcentaje,
  dataFree
}) => {
  const [stateCard, setState] = useState(false)
  const handleClick = () => {
    setState(!stateCard)
  }
  return (<div>
    {loading && <LoadingBabel />}
    {/* <marquee>Este texto se mueve de derecha a izquierda</marquee> */}
    <Container>
      <CardOne state={stateCard}>
        <form className='form-horizontal' onSubmit={handleRegister}>
          <InputHook
            label='Nombre del producto'
            name='name'
            onChange={e => { return setName(e.target.value) }}
            placeholder='Nombre del producto'
            range={{ min: 0, max: 180 }}
            // required
            type='text'
            value={names}
          />
          <InputHook
            label='ProPrice'
            name='ProPrice'
            onChange={handleChange}
            range={{ min: 0, max: 180 }}
            required
            value={numberFormat(values.ProPrice)}
          />
          <InputHook
            label='ProHeight'
            name='ProHeight'
            onChange={handleChange}
            range={{ min: 0, max: 180 }}
            required
            value={numberFormat(values.ProHeight)}
          />
          <InputHook
            label='Descuento'
            name='ProDescuento'
            onChange={handleChange}
            range={{ min: 0, max: 180 }}
            value={values.ProDescuento}
          />
          <>
            <Rate
              onRating={rate => { return setRating(rate) }}
              rating={rating}
              size={20}
              value={values.rating}
            />
            <InputHook
              label='Largo'
              name='ProLength'
              onChange={handleChange}
              range={{ min: 0, max: 180 }}
              value={values.ProLength}
            />
            <InputHook
              label='Peso'
              name='ProWeight'
              onChange={handleChange}
              range={{ min: 0, max: 180 }}
              value={values.ProWeight}
            />
            <InputHook
              TypeTextarea={true}
              label='Description'
              name='ProDescription'
              onChange={handleChange}
              range={{ min: 0, max: 180 }}
              value={values.ProDescription}
            />

            <CardInput onChange={handleCheckEnvioGratis}>
              <CardCheckBox
                id='checkboxF'
                name='gender'
                type='checkbox'
                value='1'
              />
              <CardRadioLabel htmlFor='checkboxF'>Envío gratis</CardRadioLabel>
            </CardInput>
          </>
          <Footer>
            <RippleButton
              bgColor={APColor}
              margin='1px'
              type='submit'
              widthButton='min-content'
            >Subir</RippleButton>
          </Footer>
        </form>
      </CardOne>
      <i style={{ position: 'relative' }}>
        <Button onClick={handleClick}><IconArrowRight color='blue' size='20px' /></Button>
      </i>
      <Card bgColor='#ededed' state={stateCard}>
        <FoodCardPreview
          Country={countries}
          PCant={values?.ProUniDisponibles}
          PDescription={values?.ProDescription}
          alt={alt}
          desc={values?.ProDescuento}
          features={features}
          fileInputRef={fileInputRef}
          intPorcentaje={intPorcentaje}
          onFileInputChange={onFileInputChange}
          onTargetClick={onTargetClick}
          price={values?.ProPrice}
          setRating={setRating}
          src={src}
          start={rating}
          valuesP={'name'}
        />
      </Card>
    </Container>
    <ContentProducts>
      <Text size='30px'>Filtrar productos</Text>
      <ContainerCardProduct>
        <CardProduct>
          <InputHook
            label='Busca tus productos'
            name='search'
            onChange={handleChangeFilter}
            range={{ min: 0, max: 20 }}
            type='text'
            value={search}
          />
          <i>Filtro de precio</i>
          <InputHook
            label={`${data[0]?.ProPrice}`}
            maxLength={data[0]?.ProPrice}
            // value={data[0]?.ProPrice}
            minLength={data[0]?.ProPrice}
            name='price'
            onChange={handleChange}
            range={{ min: 0, max: 180 }}
            type='range'
          />
        </CardProduct>
        <CardProduct id='space'>
          <Text size='20px'>Filtrar productos</Text>
          <div>
            <CardInput onChange={handleChangeClick}>
              <CardCheckBox
                id='checkboxF'
                name='gender'
                type='checkbox'
                value='1'
              />
              <CardRadioLabel htmlFor='checkboxF'>Envío gratis</CardRadioLabel>
            </CardInput>
            <CardInput onChange={handleChangeClick}>
              <CardCheckBox
                id='checkboxF'
                name='desc'
                type='checkbox'
                value='1'
              />
              <CardRadioLabel htmlFor='checkboxF'>Ofertas</CardRadioLabel>
            </CardInput>
          </div>
          <RippleButton bgColor={PVColor} onClick={() => { return onClickSearch() }}>Buscar</RippleButton>
          <Range
            label='Year'
            max={2018}
            min={1962}
            value={2018}
          />
        </CardProduct>
      </ContainerCardProduct>
      {/* Slider para filtrar productos */}
      <Text size='30px'>Lista de productos registrados</Text>
      <ContainerFilter>
        <ItemFilter onClick={() => { return setLocalStorage(grid) }}>
          <ContainerBurger>
            <div className='BurgerMenu__container' role='button' >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </ContainerBurger>
        </ItemFilter>
        <ItemFilter>Mejor precio</ItemFilter>
        <ItemFilter>Mayor precio</ItemFilter>
        <ItemFilter>Envio gratis</ItemFilter>
        <ItemFilter>Evaluacion</ItemFilter>
        <ItemFilter>Full envio</ItemFilter>
        <ItemFilter>Tarifa de envio</ItemFilter>
        <ItemFilter>Distancia mas corta</ItemFilter>
        <ItemFilter>Ordenar</ItemFilter>
        <ItemFilter onClick={() => { return onClickClear() }}>Limpio</ItemFilter>
      </ContainerFilter>
      <SliderAreas
        autoPlayTime={4000}
        duration={'500ms'}
        finalDataAreas={finalDataAreas}
      />
      <ContainerCardProduct grid={grid}>
        <div>
          <ItemFilter>{data?.length ? `${data?.length} Productos` : 'No hay productos'}</ItemFilter>
          <ItemFilter>{dataFree?.length ? `${dataFree?.length} Productos con envio gratis` : 'No hay productos con envio gratis'}</ItemFilter>
        </div>
        {!data?.length
          ? <SkeletonP />
          : data?.map(product => {
            return (
              <CardProduct grid={grid} key={product.pId} >
                <ButtonCard grid={grid} onClick={() => { return handleDelete(product.pId) }}>
                  <IconDelete color={PColor} size={20} />
                  <ActionName >
                  Eliminar
                  </ActionName>
                </ButtonCard>
                <ButtonCard
                  delay='.1s'
                  grid={grid}
                  top={'80px'}
                >
                  <IconEdit color={PColor} size={20} />
                  <ActionName>
                  Editar
                  </ActionName>
                </ButtonCard>
                <ContentImg grid={grid}>
                  {!product.ProImage ? <i>No img</i> : <Img alt={product.ProImage} src={product.ProImage} />}
                </ContentImg>
                <ContentInfo>
                  <ContentIconFav grid={grid}>
                    <IconLove color={PVColor} size={20} />
                  </ContentIconFav>
                  {product.ProDescuento &&
                  <span discount={product.ProDescuento} > {numberFormat(product.ProDescuento)}</span>
                  }
                  <Title>{product.pName}</Title>
                  <Text>{numberFormat(product.ProPrice)}</Text>
                  <ContentInfo direction>
                    <Rate
                      onRating={() => { return setRating(product.ProStar) }}
                      rating={product.ProStar}
                      size={20}
                      value={product.ProStar}
                    />
                    {product.ProDelivery === 1 && <span>Gratis</span>}
                  </ContentInfo>
                </ContentInfo>
              </CardProduct>
            )
          })}
      </ContainerCardProduct>
      <ReadMore onClick={() => { return setShowMore(s => { return s + 5 }) }}>CARGAR MÁS </ReadMore>
    </ContentProducts>
  </div>
  )
}

FoodComponent.propTypes = {
  alt: PropTypes.any,
  countries: PropTypes.any,
  data: PropTypes.shape({
    length: PropTypes.any,
    map: PropTypes.func
  }),
  dataFree: PropTypes.shape({
    length: PropTypes.any
  }),
  features: PropTypes.any,
  fileInputRef: PropTypes.any,
  finalDataAreas: PropTypes.any,
  handleChange: PropTypes.any,
  handleChangeClick: PropTypes.any,
  handleChangeFilter: PropTypes.any,
  handleCheckEnvioGratis: PropTypes.any,
  handleDelete: PropTypes.func,
  handleRegister: PropTypes.any,
  intPorcentaje: PropTypes.any,
  loading: PropTypes.any,
  names: PropTypes.any,
  onClickClear: PropTypes.func,
  onClickSearch: PropTypes.func,
  onFileInputChange: PropTypes.any,
  onTargetClick: PropTypes.any,
  rating: PropTypes.any,
  search: PropTypes.any,
  setLocalStorage: PropTypes.func,
  setName: PropTypes.func,
  setRating: PropTypes.func,
  setShowMore: PropTypes.func,
  src: PropTypes.any,
  state: PropTypes.any,
  values: PropTypes.shape({
    ProDescription: PropTypes.any,
    ProDescuento: PropTypes.any,
    ProHeight: PropTypes.any,
    ProLength: PropTypes.any,
    ProPrice: PropTypes.any,
    ProUniDisponibles: PropTypes.any,
    ProWeight: PropTypes.any,
    rating: PropTypes.any
  })
}
export const SkeletonP = () => {
  return <>
    <>
      {[1, 2, 3, 4].map(x => {
        return (
          <CardProduct key={x}>
            <Skeleton />
          </CardProduct>
        )
      })}
    </>
  </>
}
