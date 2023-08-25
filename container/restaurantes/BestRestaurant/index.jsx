import React from 'react'
import { ContainerCardProduct, Img } from './styled'
import Link from 'next/link'
import { SwiperSlide } from 'swiper/react'
import { useQuery } from '@apollo/client'
import { ItemCategory } from '../styled'
import { GET_ALL_RESTAURANT } from '../queries'
import { Row } from 'pkg-components'

export const BestRestaurant = () => {
  // STATES
  const { data: dataListStore } = useQuery(GET_ALL_RESTAURANT)
  return (
    <Row maxWidth={'1766px'}>
      <ContainerCardProduct>
        {dataListStore?.getAllStoreInStore?.map((x, i) => {
          return (
            <SwiperSlide key={x + i}>
              <Link href={`/delivery/${x?.city?.cName?.toLocaleLowerCase()}-${x?.department?.dName?.toLocaleLowerCase()}/${x.storeName}/${x.idStore}`}>
                <a>
                  <ItemCategory>
                    <Img alt={x.pName} src={x.path} />
                  </ItemCategory>
                </a>
              </Link>
            </SwiperSlide>
          )
        })}
      </ContainerCardProduct>
    </Row >
  )
}
