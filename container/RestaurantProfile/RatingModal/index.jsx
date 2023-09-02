import React from 'react'
import PropTypes from 'prop-types'
import {
  CardItemRating,
  CtnItemFilter
} from '../styled'
import {
  AwesomeModal,
  Button,
  Text
} from 'pkg-components'
import {
  IconDisLike,
  IconLike,
  IconTicker
} from 'public/icons'
import { BGColor, PColor } from 'public/colors'

export const RatingModal = ({
  data,
  rTasty,
  appearance,
  rGoodTemperature,
  rGoodCondition,
  setRatings,
  handleRating,
  setOpenRate,
  openRate,
  id
}) => {
  return (
    <AwesomeModal
      borderRadius='4px'
      customHeight='70vh'
      footer={false}
      header={false}
      height='70vh'
      onCancel={() => { return false }}
      onHide={() => { return setOpenRate(!openRate) }}
      padding={0}
      question={false}
      show={openRate}
      size='600px'
      sizeIconClose='30px'
      title={`Califica ${data.storeName || ''}`}
      zIndex='9999'
    >
      <div className='rating-container'>
        {[
          { keyAccess: 'rTasty', text: 'Buen sabor', state: rTasty },
          { keyAccess: 'appearance', text: 'Buena apariencia', state: appearance },
          { keyAccess: 'rGoodTemperature', text: 'Buena temperatura', state: rGoodTemperature },
          { keyAccess: 'rGoodCondition', text: 'Buenas condiciones', state: rGoodCondition }
        ].map(item => {
          return (
            <CardItemRating key={item.text}>
              <Text>{item.text}</Text>
              <CtnItemFilter>
                <IconTicker size='30px' />
              </CtnItemFilter>
              <div className='option'>
                <Button
                  className='button-rating_action'
                  onClick={() => {
                    setRatings((prevState) => {
                      if (prevState[item.keyAccess] < 1) {
                        return {
                          ...prevState,
                          [item.keyAccess]: prevState[item.keyAccess] + 1
                        }
                      }
                      return prevState // No permite incrementar más allá de 1
                    })
                  }}
                >
                  <IconLike size='30px' />
                </Button>

                <Text>
                  {item.state}
                </Text>
                <Button
                  className='button-rating_action'
                  onClick={() => {
                    setRatings((prevState) => {
                      if (prevState[item.keyAccess] > 0) {
                        return {
                          ...prevState,
                          [item.keyAccess]: prevState[item.keyAccess] - 1
                        }
                      }
                      return prevState // No permite decrementar más allá de -1
                    })
                  }}
                >
                  <IconDisLike size='30px' />
                </Button>

              </div>
            </CardItemRating>
          )
        })}
      </div>

      <Button
        backgroundColor={PColor}
        className='button-rating'
        color={BGColor}
        margin='0px'
        onClick={() => { return handleRating(id) }}
        padding='0px'
        widthButton='100%'
      >
            Subir
      </Button>
    </AwesomeModal>
  )
}

RatingModal.propTypes = {
  data: PropTypes.object,
  rTasty: PropTypes.number,
  appearance: PropTypes.number,
  rGoodTemperature: PropTypes.number,
  rGoodCondition: PropTypes.number,
  setRatings: PropTypes.func,
  handleRating: PropTypes.func,
  setOpenRate: PropTypes.func,
  openRate: PropTypes.bool,
  id: PropTypes.string
}

