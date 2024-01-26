import React, { useState } from 'react'
import { BannerPromo, Content, Img } from './styled'
import Link from 'next/link'
import { GET_ALL_BANNERS } from 'gql/getBanners'
import { useQuery } from '@apollo/client'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Virtual, Navigation, Pagination, A11y, Parallax } from 'swiper'
export const Banner = () => {
  // STATES
  const [color, setActiveColor] = useState(null)
  // HANDLES
  const { data } = useQuery(GET_ALL_BANNERS, {
    context: { clientName: 'admin-server' }
  })

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
