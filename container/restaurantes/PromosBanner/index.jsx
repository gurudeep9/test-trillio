import Link from 'next/link'
import Image from 'next/image'
import {
  BannerPromo,
  ContainerCardProduct,
  Content,
  ContainerSliderPromo,
  CardPromo
} from './styled'
import { GET_ALL_BANNERS, GET_ALL_BANNERS_PROMO } from 'gql/getBanners'
import { useQuery } from '@apollo/client'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Virtual,
  Navigation,
  Pagination,
  A11y,
  Parallax
} from 'swiper'

export const PromosBanner = () => {
  const { data } = useQuery(GET_ALL_BANNERS, {
    context: { clientName: 'admin-store' }
  })
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
          {[1, 3, 4, 5, 6]?.map((banner, index) => {
            return (
              <SwiperSlide key={banner?.BannerId} virtualIndex={index}>
                <Link
                  href={`/restaurantes/promos/${banner?.name?.replace(
                    /\s/g,
                    '-'
                  )}/${banner?.BannerId}`}
                  prefetch={true}
                >
                  <div>
                    <BannerPromo key={banner?.pId}>
                      <Image
                        alt={banner?.description}
                        height={150}
                        layout='responsive'
                        objectFit='cover'
                        priority={true}
                        src='/images/promotions16.avif'
                        width={380}
                      />
                    </BannerPromo>
                  </div>
                </Link>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </ContainerCardProduct>
    </Content>
  )
}

export const PromoBannerStores = () => {
  const { data: datapro } = useQuery(GET_ALL_BANNERS_PROMO, {
    context: { clientName: 'admin-store' }
  })
  const dataFinal = datapro?.getAllPromoBanners?.slice(0, 3) ?? []

  return (
    <ContainerSliderPromo>
      {datapro &&
        dataFinal?.map((pb) => {
          return (
            <CardPromo key={pb.bpId}>
              <Image
                alt={pb.description}
                height={100}
                layout='responsive'
                objectFit='cover'
                priority={true}
                src={'/images/DEFAULTBANNER.png'}
                width={100}
              />

              <div className='goto-action'>
                <span className='text'>{pb.name}</span>
              </div>
            </CardPromo>
          )
        })}
    </ContainerSliderPromo>
  )
}
