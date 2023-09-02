/* eslint-disable multiline-ternary */
import PropTypes from 'prop-types'
import React from 'react'
import {
  Sticky,
  StickyBoundary,
  StickyViewport
} from '../stickyheader'
import {
  CardProducts,
  Skeleton,
  Loading
} from 'pkg-components'
import {
  ContainerCarrusel,
  ContentSearch,
  Title
} from './styled'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { BGColor } from 'public/colors'
import { useDeleteProductsFood } from 'npm-pkg-hook'

export const ProductCategories = ({
  data = [],
  reference = null,
  loadingCatProd = false,
  sendNotification = () => { },
  handleGetOneProduct = () => { },
  setAlertBox = () => { }
}) => {
  const containerStyle = {
    height: '100vh',
    padding: '0px 30px 0'
  }
  const router = useRouter()
  const { handleDelete, loading } = useDeleteProductsFood({ sendNotification })

  const handleClickDelete = async ({ pId, pState }) => {
    await handleDelete({
      pId,
      pState
    })
  }
  if (loadingCatProd) {
    return (
      <ContainerCarrusel>
        <Skeleton height={200} numberObject={6} />
      </ContainerCarrusel>
    )
  }
  return (
    <>
      {loading && <Loading />}
      <StickyViewport as='main' style={containerStyle}>
        {data?.map((x, key) => {
          return (
            <div key={x.carProId}>
              <StickyBoundary
                key={key}
                onChange={() => { }}
                onStuck={() => { }}
                onUnstuck={() => { }}
              >
                <Sticky
                  as='h3'
                  id={key}
                  name={x?.pName}
                >
                  <ContentSearch>
                    <Title color={BGColor} size='.9em' >{x?.pName}</Title>
                  </ContentSearch>
                </Sticky>
                <ContainerCarrusel>
                  {x.productFoodsAll?.length > 0 ? x.productFoodsAll?.map(food => {
                    return (
                      <CardProducts
                        food={food}
                        handleDelete={() => { return handleClickDelete(food) }}
                        image={
                          <Image
                            alt={'/images/DEFAULTBANNER.png'}
                            blurDataURL='/images/DEFAULTBANNER.png'
                            layout='fill'
                            objectFit='cover'
                            src='/images/DEFAULTBANNER.png'
                          />
                        }
                        isEdit={false}
                        isVisible={true}
                        key={food.pId}
                        onClick={() => { return handleGetOneProduct(food) }}
                        redirect={() => { return router.push(`/update/products/editar/${food.pId}`) }}
                        setAlertBox={setAlertBox}
                      />
                    )
                  }) : <Skeleton height={200} numberObject={2} />}
                </ContainerCarrusel>
              </StickyBoundary>
              {(key === data.length - 1) &&
                <div ref={reference} style={{ height: '100px', marginTop: '100px' }} />
              }
            </div>
          )
        })}
      </StickyViewport>
    </>
  )
}

ProductCategories.propTypes = {
  data: PropTypes.array,
  handleGetOneProduct: PropTypes.func,
  reference: PropTypes.any,
  loadingCatProd: PropTypes.bool,
  sendNotification: PropTypes.func,
  setAlertBox: PropTypes.func,
  setValueProductName: PropTypes.func
}
export const StickyBoundaryCategories = React.memo(ProductCategories)
