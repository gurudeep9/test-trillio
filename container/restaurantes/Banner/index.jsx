import React, { useContext, useState } from 'react'
import { Context } from '../../../context'
import { BannerPromo, Content, Img } from './styled'
import Link from 'next/link'
import { GET_ALL_BANNERS } from 'gql/getBanners'
import { useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Virtual, Navigation, Pagination, A11y, Parallax } from 'swiper'
export const Banner = () => {
  const swiper = useSwiper()
  const location = useRouter()
  // STATES
  const { dispatch, setAlertBox, state_product_card, handleMenu } = useContext(Context)
  const [color, setActiveColor] = useState(null)
  // HANDLES
  const { data } = useQuery(GET_ALL_BANNERS, {
    context: { clientName: 'admin-server' }
  })

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
                href={`/restaurantes/promos/${banner.name.replace(/\s/g, '-')}/${banner.BannerId}`}
                key={banner.BannerId}
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
    </Content >
  )
}
