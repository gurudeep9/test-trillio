import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  AwesomeModal,
  BGColor,
  RippleButton,
  SECBGColor
} from 'pkg-components'
import { useRestaurant } from 'npm-pkg-hook'
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
  ItemFilter
} from './styled'
import { ListRestaurant } from './restaurant'

export const Restaurant = () => {
  // STATES

  const [openModalOrganiceQuery, setOpenModalOrganiceQuery] = useState(false)
  const [modal, setModal] = useState(false)
  const [showMore, setShowMore] = useState(100)
  // HOOKS
  const router = useRouter()
  const [data, {
    fetchMore,
    loading,
    handleSendQueries,
    handleFilterStore,
    handleCleanQueries
  }] = useRestaurant({
    location: router
  })
  const queryPriceStore = router.query.bestPrice

  return (
    <Content>
      <ContainerFilter>
        <ItemFilter onClick={() => { return setOpenModalOrganiceQuery(!openModalOrganiceQuery) }}>Ordenar</ItemFilter>
        <ItemFilter>Mejor precio</ItemFilter>
        <ItemFilter>Envíos gratis</ItemFilter>
        <ItemFilter>Promociones</ItemFilter>
        <ItemFilter onClick={() => { return setModal(!modal) }}>Filtros</ItemFilter>
      </ContainerFilter>
      <H2>Categorías</H2>
      <Categories />
      <PromoBannerStores />
      <AwesomeModal
        btnCancel={false}
        btnConfirm={false}
        customHeight='75vh'
        footer={false}
        header={false}
        onCancel={() => { return false }}
        onHide={() => { setOpenModalOrganiceQuery(!openModalOrganiceQuery) }}
        question={false}
        show={openModalOrganiceQuery}
        size='40vw'
        zIndex='9990'
      >
        <div className='wrapper-query'>
          <Tabs width={['33.33%', '33.33%', '33.330%']} >
            <Tabs.Panel label='Básicos'>
              <>
                <h2>Modo de entrega</h2>
                <ContainerFilter>
                  <ItemFilter onClick={() => { return setOpenModalOrganiceQuery(!openModalOrganiceQuery) }}>
                    Entrega a domicilio
                  </ItemFilter>
                  <ItemFilter onClick={() => { return setOpenModalOrganiceQuery(!openModalOrganiceQuery) }}>
                    Retiro en tienda
                  </ItemFilter>
                </ContainerFilter>
                <h2>Ordenar por</h2>
                <ContainerFilter>
                  <ItemFilter
                    active={queryPriceStore}
                    onClick={() => {
                      if (queryPriceStore) return handleCleanQueries('bestPrice')
                      return handleSendQueries('bestPrice', true)
                    }}
                  >
                    Precio
                  </ItemFilter>
                </ContainerFilter>
              </>
            </Tabs.Panel>
            <Tabs.Panel label='Categorias'>
            Categorias
            </Tabs.Panel>
          </Tabs>
        </div>
        <div className='content-ripple-action__query'>{console.log({loading})}
          <RippleButton
            loading={loading}
            onClick={() => {
              return handleFilterStore()
            }}
          >
            Ver resultados
          </RippleButton>
        </div>
      </AwesomeModal>

      <AwesomeModal
        borderRadius='10px'
        btnCancel={false}
        btnConfirm={true}
        footer={false}
        header={false}
        onCancel={() => { return false }}
        onConfirm={() => { return router.push('/restaurante') }}
        onHide={() => { setModal(!modal) }}
        padding='25px'
        show={modal}
        size='60%'
        zIndex='9990'
      >
        <ContentFilter>
          {[1, 2, 3, 4, 5].map((x) => {
            return (
              <CtnItemFilter key={x}>
                <IconLogo color={PColor} size='52px' />
              </CtnItemFilter>
            )
          })}
        </ContentFilter>
      </AwesomeModal >
      <H2>Tiendas</H2>
      <setion>
        <ListRestaurant data={data} />
      </setion>
      <RippleButton
        bgColor={PColor}
        border={`1px solid ${SECBGColor}`}
        color={BGColor}
        loading={loading}
        margin={'20px 0'}
        onClick={() => {
          setShowMore(showMore + 100)
          fetchMore({
            variables: { max: showMore, min: 0 },
            updateQuery: (prevResult, { fetchMoreResult }) => {
              if (!fetchMoreResult) return prevResult
              return {
                getAllStoreInStore: [...fetchMoreResult.getAllStoreInStore]

              }
            }
          })
        }}
        overColor={PColor}
        widthButton='100%'
      >
        Ver más
      </RippleButton>
    </Content>
  )
}
