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
  Navigation,
  Pagination,
  A11y
} from 'swiper'
import { Loading } from 'pkg-components'

export const PromosBanner = () => {
  const { data, loading } = useQuery(GET_ALL_BANNERS, {
    context: { clientName: 'admin-store' }
  })
  const isValidImageUrl = (url) => {
    // Expresión regular para validar URLs con protocolo http o https
    const urlPattern = /^(http|https):\/\/.*$/
    // Expresión regular para validar extensiones de imagen comunes
    const imageExtensionPattern = /\.(jpg|jpeg|png|gif)$/i

    return urlPattern.test(url) && imageExtensionPattern.test(url)
  }
  const banners = data?.getAllMasterBanners || []

  if (loading) return <Loading />

  return (
    <Content>
      <ContainerCardProduct>
        <Swiper
          breakpoints={{
            320: {
              spaceBetween: 12,
              slidesPerView: 1
            },
            560: {
              spaceBetween: 12,
              slidesPerView: 3
            },
            960: {
              spaceBetween: 12,
              slidesPerView: 3
            },
            1440: {
              spaceBetween: 16,
              slidesPerView: 3
            },
            1818: {
              spaceBetween: 16,
              slidesPerView: 3
            }
          }}
          className='Swiper_wrapper_banner'
          modules={[Navigation, Pagination, A11y]}
          navigation
        >
          {banners?.map((banner, index) => {
            return (
              <SwiperSlide key={banner?.BannerId} virtualIndex={index}>
                <Link
                  href={`/restaurantes/promos/${banner?.name?.replace(
                    /\s/g,
                    '-'
                  )}/${banner?.BannerId}`}
                  prefetch={true}
                >
                  <BannerPromo key={banner?.pId}>
                    <Image
                      alt={banner?.description}
                      layout='fill'
                      objectFit='contain'
                      priority={true}
                      src={isValidImageUrl(banner?.path) ? banner.path : '/images/promotions16.avif'}
                    />
                  </BannerPromo>
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
