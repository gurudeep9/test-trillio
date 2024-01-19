import Image from 'next/image'
import Link from 'next/link'
import { useCategoryStore } from 'npm-pkg-hook'
import React from 'react'
import styled from 'styled-components'
import { PColor } from '../../../public/colors'
import { CtnBox } from '../styled'
import { handleJoinImage } from './helpers'
import { BColor } from 'pkg-components'
import { Swiper, SwiperSlide } from 'swiper/react'
import {
  Virtual,
  Navigation,
  Pagination,
  A11y,
  Parallax
} from 'swiper'

export const Categories = () => {
  const [getCatStore] = useCategoryStore()
  const newDataCatStore = handleJoinImage({
    data: getCatStore?.getAllCatStore || []
  })

  return (
    <Container>
      <Swiper
        autoplay={true}
        breakpoints={{
          200: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          390: {
            slidesPerView: 3,
            spaceBetween: 20
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 20
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 10
          }
        }}
        loop={true}
        modules={[Virtual, Navigation, Pagination, A11y, Parallax]}
        navigation
        virtual

      >
        {newDataCatStore?.map(cat => {
          const nameCat = cat?.cName?.replace(/\s/g, '-')?.toLowerCase()
          return (
            <SwiperSlide key={cat.catStore}>
              <CtnBox >
                <Link href={`/categories/${nameCat}/${cat.catStore}`}>
                  <a style={{ color: BColor }}>
                    <ItemCategory>
                      <Image
                        alt={cat.cPathImage || ''}
                        blurDataURL='data:...'
                        height={90}
                        objectFit='contain'
                        placeholder='blur'
                        src={cat.cPathImage}
                        unoptimized={true}
                        width={90}

                      />
                    </ItemCategory>
                    <h2 className='title-cat'>{cat.cName}</h2>
                  </a>
                </Link>
              </CtnBox>
            </SwiperSlide>
          )
        })}
      </Swiper>
      <Link href={'/categorias'}>
        <Anchor>
          Ver todas
        </Anchor>
      </Link>
    </Container>
  )
}

export const Anchor = styled.a`
  color: ${PColor};
  font-size: 12px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
export const Container = styled.div`
  height: 150px;
  max-height: 150px;
  min-height: 150px;
  text-align: end;
`
export const ItemCategory = styled.div`
    width: 100%;
    border-radius: 3% ;
    height: 100px;
    && .swiper-slide .swiper-slide-visible {
      width: min-content !important;
    }
`
export const List = styled.div`
    width: 100%;

    .title-cat {
        margin-top: 10px;
        font-size: 14px;
        font-family: PFont-Light;
        font-weight: 400;
    }
`
