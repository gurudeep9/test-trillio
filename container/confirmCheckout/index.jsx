import { useState } from 'react'
import PropTypes from 'prop-types'
import { PColor, PLColor } from '../../public/colors'
import Link from 'next/link'
import { RippleButton } from '../../components/Ripple'
import {
  Anchor,
  Body,
  Card,
  CardPro,
  ContainerAnimation,
  ContainerAnimationTow,
  ContentInfo,
  flex,
  Text,
  Wrapper
} from './styled'
import { numberFormat } from '../../utils'

export const ConfirmCheckout = ({ dataOneProduct, handleSubmitPedido }) => {
  const { ProPrice, ProDescription, pName, getStore, ValueDelivery } = dataOneProduct || {}
  const { city, storeName, idStore } = getStore || {}
  const [active, setActive] = useState(1)
  const handleClick = index => {
    setActive(index === active ? true : index)
  }
  const calculatePriceFinal = () => {
    return ValueDelivery + parseInt(ProPrice)
  }
  return (
    <Body>
      <Card>
        <RippleButton
          active={active === 1}
          bgColor='transparent'
          borderRadius='0'
          color='red'
          label='Entrega'
          margin='0px 5px'
          onClick={() => { return active !== 1 && handleClick(1) }}
          padding='10px'
        />
        {/* <RippleButton active={active === 2} margin='0px 5px' borderRadius='0' color="red" padding="10px" bgColor='transparent' label='Recoger' onClick={() => active !== 2 && handleClick(2)} /> */}
        <ContentInfo>
          {active === 1
            ? <ContainerAnimation>
              <ProcessCheckoutCard />
            </ContainerAnimation>
            : active === 2
              ? <ContainerAnimationTow>
                <ProcessCheckoutCard />
              </ContainerAnimationTow>
              : null}
          <Text>{pName}</Text>
          <RippleButton
            disabled={false}
            margin='20px auto'
            onClick={() => { return handleSubmitPedido() }}
            widthButton='100%'
          >Nada</RippleButton>
        </ContentInfo>
      </Card>
      <Card>
        <CardPro>
          <Text size='15px'>Tu pedido en</Text>
          <Wrapper border styles={flex}>
            <Text size='20px'>{storeName}</Text>
            <Link href={`delivery/${city?.cName}/${storeName}/${idStore}`}>
              <Anchor>
                                Ver restaurante
              </Anchor>
            </Link>
          </Wrapper>
          <Wrapper styles={flex}>
            <Text size='12px'>{pName} {ProDescription} </Text>
            <Text align='end' size='12px'>$ {numberFormat(ProPrice)}</Text>
          </Wrapper>
          <div styles={flex}>
            <Text color={PColor} size='12px' >Editar </Text>
            <Text
              align='end'
              color={`${PLColor}`}
              size='12px'
            >Eliminar </Text>
          </div>
          <div styles={flex}>
            <Text size='12px' >Costo de envio </Text>
            <Text
              align='end'
              color={`${PLColor}`}
              size='12px'
            >{ValueDelivery || 'Gratis'} </Text>
          </div>
          <div styles={flex}>
            <Text size='12px' >Total </Text>
            <Text
              align='end'
              color={`${PLColor}`}
              size='12px'
            >{calculatePriceFinal()} </Text>
          </div>
        </CardPro>

      </Card>
    </Body>
  )
}

ConfirmCheckout.propTypes = {
  dataOneProduct: PropTypes.object,
  handleSubmitPedido: PropTypes.func
}


const ProcessCheckoutCard = () => {
  return (
    <div>
      <Wrapper border>
        <Text>Estandar</Text>
      </Wrapper>
    </div>
  )
}

ProcessCheckoutCard.propTypes = {}
