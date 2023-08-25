import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../../../context'
import { BannerPromo, ContainerCardProduct, Content, Img, ContainerSliderPromo, CardPromo, ImageBannerPromo } from './styled'
import Link from 'next/link'
import { GET_ALL_BANNERS, GET_ALL_BANNERS_PROMO } from 'gql/getBanners'
import { useQuery } from '@apollo/client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Virtual, Navigation, Pagination, A11y, Parallax } from 'swiper'

export const PromosBanner = () => {
  // STATES
  const { dispatch, setAlertBox, state_product_card, handleMenu } = useContext(Context)
  const [color, setActiveColor] = useState(null)
  // HANDLES
  const { data } = useQuery(GET_ALL_BANNERS, {
    context: { clientName: 'admin-server' }
  })

  // console.log(datapro.getAllPromoBanners)
  const handleAddProduct = elem => {
    handleMenu(1)
    const includes = state_product_card?.PRODUCT.includes(elem)
    console.log(includes)
    if (includes) {
      setAlertBox({ message: 'El producto ya esta en la lista' })
    } else {
      dispatch({ type: 'ADD_PRODUCT', payload: elem })
    }
  }
  return (
    <Content>
      <ContainerCardProduct>
        <Swiper
          autoplay={true}
          modules={[Virtual, Navigation, Pagination, A11y, Parallax]}
          navigation
          slidesPerView={3}
          spaceBetween={10}
          virtual
        >
          {data && data?.getAllMasterBanners?.map((banner, index) => {
            return (
              <SwiperSlide
                key={banner.BannerId}
                virtualIndex={index}
              >
                <Link
                  // key={banner.BannerId}
                  href={`/restaurantes/promos/${banner.name.replace(/\s/g, '-')}/${banner.BannerId}`}
                  prefetch={true}
                >
                  <a>
                    <BannerPromo
                      color={color}
                      key={banner.pId}
                      onMouseOut={() => { return setActiveColor('red') }}
                      onMouseOver={() => { return setActiveColor('blue') }}
                    >
                      <Img alt={banner.description} src={banner.path} />
                    </BannerPromo>
                  </a>
                </Link>

              </SwiperSlide>
            )
          })}
        </Swiper>
      </ContainerCardProduct>
    </Content >
  )
}

export const PromoBannerStores = () => {
  const { data: datapro } = useQuery(GET_ALL_BANNERS_PROMO, {
    context: { clientName: 'admin-server' }
  })
  const chartColor = ['rgba(1,25,71, 0.0001)', '#01194750', 'rgb(255 0 0 / 0%)']
  // const final =
  const [colorGradient, setColorGradient] = useState(`0deg, ${chartColor[(Math.random() * (3 - 0) + 0).toFixed(0)]} 0%, ${chartColor[(Math.random() * (3 - 0) + 0).toFixed(0)]} 100%`)
  const dataFinal = datapro?.getAllPromoBanners?.slice(0, 3)
  useEffect(() => {
    const final = `0deg, ${chartColor[(Math.random() * (3 - 0) + 0).toFixed(0)]} 0%, ${chartColor[(Math.random() * (3 - 0) + 0).toFixed(0)]} 100%`
    setColorGradient(final)
  }, [])

  return (
    <ContainerSliderPromo>
      {datapro && dataFinal?.map(pb => {
        return (
          <CardPromo final={colorGradient} key={pb.bpId}>
            <ImageBannerPromo alt={pb.description} src={pb.path} />
            <div className='goto-action'>
              <span className='text'>{pb.name}</span>
            </div>
          </CardPromo>
        )
      })}
    </ContainerSliderPromo>
  )
}
