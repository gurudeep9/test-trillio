import PropTypes from 'prop-types'
import React from 'react'
import { Card } from './styled'
import Image from 'next/image'
import { APColor } from '../../../public/colors'
import { Text } from '../styled'

const CardProduct = ({ food, onClick }) => {
  return (
    <Card onClick={onClick}>
      <div>
        <h3 className='card__description'>{food.pName}</h3>
        <h3 className='card__description_main'>{food.ProDescription}</h3>
        <div className='footer'>
          <Text color={APColor}>{food.ProDelivery === 1 ? 'Envio Gratis' : ''}</Text>
          <span className='card__price'>$ {food.ProPrice}</span>
          <span className='card__des' style={{ color: APColor }}>$ {food.ProDescuento}</span>
        </div>
      </div>
      <Image
        alt={food.ProImage || 'Picture of the author'}
        className='store_image'
        height={100}
        layout='responsive'
        objectPosition='cover'
        priority
        src='/images/b70f2f6c-8afc-4d75-bdeb-c515ab4b7bdd_BRITS_GER85.jpg'
        width={100}
      />
    </Card>
  )
}

CardProduct.propTypes = {
  food: PropTypes.shape({
    ProDelivery: PropTypes.number,
    ProDescription: PropTypes.any,
    ProDescuento: PropTypes.any,
    ProImage: PropTypes.string,
    ProPrice: PropTypes.any,
    pName: PropTypes.any
  }),
  onClick: PropTypes.any
}

export default React.memo(CardProduct)