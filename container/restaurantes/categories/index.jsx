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
        modules={[Virtual, Navigation, Pagination, A11y, Parallax]}
        navigation
        slidesPerView={3}
        spaceBetween={10}
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
  text-align: end;
`
export const ItemCategory = styled.div`
    width: 100%;
    border-radius: 3% ;
    height: 100px;
    align-items: center;
    display: grid;
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
