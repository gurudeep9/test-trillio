import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  RippleButton,
  AwesomeModal,
  Range
} from 'pkg-components'
import { useSetState } from '../../components/hooks/useState'
import Tabs from '../../components/Tabs'
import { PColor } from '../../public/colors'
import { IconLogo } from '../../public/icons'
import { Categories } from './categories'
import { PromoBannerStores } from './PromosBanner'
import {
  ContainerFilter,
  Content,
  ContentFilter,
  CtnItemFilter,
  H2,
  ItemFilter,
  WrapFlex
} from './styled'

export const Restaurant = () => {
  // STATES
  const router = useRouter()
  const [openModalOrganiceQuery, setOpenModalOrganiceQuery] = useState(false)
  const OPEN_MODAL_FILTER = useSetState(0)
  return (
    <Content>
      <ContainerFilter>
        <ItemFilter onClick={() => { return setOpenModalOrganiceQuery(!openModalOrganiceQuery) }}>Ordenar</ItemFilter>
        <ItemFilter>Mejor precio</ItemFilter>
        <ItemFilter>Envíos gratis</ItemFilter>
        <ItemFilter>Promociones</ItemFilter>
        <ItemFilter onClick={() => { return OPEN_MODAL_FILTER.setState(!OPEN_MODAL_FILTER.state) }}>Filtros</ItemFilter>
      </ContainerFilter>
      <H2>Categorías</H2>
      <Categories />
      {/* BEST RESTAURANT */}
      <PromoBannerStores />
      <AwesomeModal
        btnCancel={false}
        btnConfirm={true}
        customHeight='60vh'
        footer={true}
        header={false}
        height='60vh'
        onCancel={() => { return false }}
        onConfirm={() => { return router.push('/restaurantes') }}
        onHide={() => { setOpenModalOrganiceQuery(!openModalOrganiceQuery) }}
        padding='25px'
        show={openModalOrganiceQuery}
        size='80%'
        zIndex='9990'
      >
        <Tabs width={['33.33%', '33.33%', '33.330%']} >
          <Tabs.Panel label={`Básicos`}>
            <>
              <h2>Modo de entrega</h2>
              <ContainerFilter>
                <ItemFilter onClick={() => { return setOpenModalOrganiceQuery(!openModalOrganiceQuery) }}>Entrega a domicilio</ItemFilter>
                <ItemFilter onClick={() => { return setOpenModalOrganiceQuery(!openModalOrganiceQuery) }}>Entrega a domicilio</ItemFilter>
              </ContainerFilter>
              <h2>Ordenar por</h2>
              <ContainerFilter>
                <ItemFilter onClick={() => { return setOpenModalOrganiceQuery(!openModalOrganiceQuery) }}>Entrega a domicilio</ItemFilter>
                <ItemFilter onClick={() => { return setOpenModalOrganiceQuery(!openModalOrganiceQuery) }}>Entrega a domicilio</ItemFilter>
              </ContainerFilter>
              <h2>Distancia</h2>
              <Range
                label='km'
                max={5000}
                min={1962}
                value={2018}
              />
              <RippleButton widthButton='100%'>Ver resultados </RippleButton>
            </>
          </Tabs.Panel>
          <Tabs.Panel label={`Categorías`}>
            <WrapFlex>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item, index) => { return <ItemFilter key={index + 1} onClick={() => { return setOpenModalOrganiceQuery(!openModalOrganiceQuery) }}>Entrega a domicilio</ItemFilter> })}
            </WrapFlex>
            <RippleButton widthButton='100%'>Ver resultados </RippleButton>
          </Tabs.Panel>
          <Tabs.Panel label={`Métodos de pago`}>
            <h2>Pago de la app</h2>
            <WrapFlex>
              {[1, 2, 3, 4, 5].map((item, index) => { return <ItemFilter key={index + 1} onClick={() => { return setOpenModalOrganiceQuery(!openModalOrganiceQuery) }}>Amex</ItemFilter> })}
            </WrapFlex>
            <RippleButton widthButton='100%'>Ver resultados </RippleButton>
          </Tabs.Panel>
        </Tabs>
      </AwesomeModal >
      <AwesomeModal
        borderRadius='10px'
        btnCancel={false}
        btnConfirm={true}
        footer={true}
        header={false}
        height='40vh'
        onCancel={() => { return false }}
        onConfirm={() => { return router.push('/restaurante') }}
        onHide={() => { OPEN_MODAL_FILTER.setState(!OPEN_MODAL_FILTER.state) }}
        padding='25px'
        show={OPEN_MODAL_FILTER.state}
        size='60%'
        zIndex='9990'
      >
        <h2>Ordenar por </h2>
        <ContentFilter>
          {[1, 2, 3, 4, 5].map((x, i) => {
            return (
              <CtnItemFilter key={i + 1}>
                <IconLogo color={PColor} size='52px' />
              </CtnItemFilter>
            )
          })}
        </ContentFilter>
      </AwesomeModal >
      <H2>Tiendas</H2>
    </Content>
  )
}
