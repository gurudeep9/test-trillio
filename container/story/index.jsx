import PropTypes from 'prop-types'
import { StoryItem } from './story-item'
import styled from 'styled-components'
import { GET_ALL_STORY, GET_ALL_STORY_IMAGE_ITEM } from './queries'
import { useLazyQuery } from '@apollo/client'
import { useEffect } from 'react'
import { SlideStory } from './modalStory'
import { useSetState } from 'components/hooks/useState'
import { SwiperSlide } from 'swiper/react'
import CustomSlider from 'components/Slider'

const Wrap = styled.ul`
  display: flex;
  padding: 0 24px;
  position: relative;
  margin-bottom: 44px;

  @media only screen and (max-width: 735px) {
    padding: 0px;
    margin-bottom: 21px;
  }
`
export function Story ({ idStore }) {
  // STATE
  const OpenModalInfo = useSetState(null)
  const OpenModal = useSetState(false)
  // QUERY
  const [getAllStoryStore, { data }] = useLazyQuery(GET_ALL_STORY)
  const [getAllStoryItemPhotoStore, { data: dataItem }] = useLazyQuery(GET_ALL_STORY_IMAGE_ITEM)
  useEffect(() => {
    getAllStoryStore({ variables: { idStore } })
  }, [data])
  // HANDLE
  const handleSlider = (item) => {
    OpenModalInfo.setState(item)
    OpenModal.setState(!OpenModal.state)
    getAllStoryItemPhotoStore({ variables: { stoId: item.stoId } })
  }
  const closeModal = () => { return OpenModal.setState(!OpenModal.state) }
  return (
    <Wrap>
      <CustomSlider
        autoplay={false}
        centeredSlides
        direction='horizontal'
        infinite={false}
        slidesToShow={10}
        spaceBetween={35}
      >
        {data && data?.getAllStoryStore?.map((item, i) => {
          return (
            <SwiperSlide
              key={item.iStoId}
            >
              <StoryItem
                imagePath={item.imagePath}
                key={item}
                onClick={() => { return handleSlider(item) }}
                title={item.nameStore}
              />
            </SwiperSlide>
          )
        })}
      </CustomSlider>
      {OpenModal.state && <SlideStory
        OpenModalInfo={OpenModalInfo}
        closeModal={closeModal}
        data={data?.getAllStoryStore || []}
        dataItem={dataItem?.getAllStoryItemPhotoStore || []}
      />}
    </Wrap>
  )
}

Story.propTypes = {
  idStore: PropTypes.any
}

