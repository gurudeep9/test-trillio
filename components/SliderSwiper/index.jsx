import PropTypes from 'prop-types'
import { PColor } from 'public/colors'
import { IconArrowLeft, IconArrowRight } from 'public/icons'
import React, { useRef } from 'react'
import SwiperCore, {
  Autoplay,
  Pagination,
  Navigation
} from 'swiper'
import { Swiper } from 'swiper/react'
import { SlideBar, SwiperButton } from './styled'

SwiperCore.use([Autoplay, Pagination, Navigation])

export const SliderSwiper = ({
  square,
  children,
  spaceBetween,
  slidesPerView,
  slidesPerColumn,
  slidesPerGroup,
  autoplay,
  pagination, direction, breakpoints, keySwiper, onChangeIndex = () => { }
}) => {
  const prevRef = useRef(undefined)
  const nextRef = useRef(undefined)
  return (
    <div>
      <SlideBar>
        <Swiper
          autoplay={autoplay}
          breakpoints={breakpoints}
          direction={direction || 'horizontal'}
          key={keySwiper}
          onActiveIndexChange={onChangeIndex}
          onInit={swiper => {
            swiper.params.navigation.prevEl = prevRef.current
            swiper.params.navigation.nextEl = nextRef.current
            swiper.navigation.update()
          }}
          pagination={pagination || { clickable: true }}
          slidesPerColumn={slidesPerColumn || 1}
          slidesPerGroup={slidesPerGroup || 4}

          slidesPerView={slidesPerView || 1}
          spaceBetween={spaceBetween || 0}
        >
          {children}
          {square
            ? <>
              <SwiperButton
                height='80px'
                prev
                radius='8px'
                ref={prevRef}
                width='50px'
              ><IconArrowLeft color={PColor} size='20px' /></SwiperButton>
              <SwiperButton
                height='80px'
                radius='8px'
                ref={nextRef}
                width='50px'
              ><IconArrowRight color={PColor} size='20px' /></SwiperButton>
            </>
            : <>
              <SwiperButton prev ref={prevRef}><IconArrowLeft color={PColor} size='20px' /></SwiperButton>
              <SwiperButton ref={nextRef}><IconArrowRight color={PColor} size='20px' /></SwiperButton>
            </>
          }
        </Swiper>
      </SlideBar>
    </div >
  )
}

SliderSwiper.propTypes = {
  autoplay: PropTypes.any,
  breakpoints: PropTypes.any,
  children: PropTypes.any,
  direction: PropTypes.string,
  keySwiper: PropTypes.any,
  onChangeIndex: PropTypes.func,
  pagination: PropTypes.shape({
    clickable: PropTypes.bool
  }),
  slidesPerColumn: PropTypes.number,
  slidesPerGroup: PropTypes.number,
  slidesPerView: PropTypes.number,
  spaceBetween: PropTypes.number,
  square: PropTypes.any
}
