import moment from 'moment'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { BGColor } from 'public/colors'
import { useStatusOrdersClient } from 'npm-pkg-hook'
import { IconWhatsApp } from 'public/icons'
import {
  Anchor,
  ContainerShare,
  ContentShare,
  DisRestaurant,
  FeedItem,
  Flex,
  OlList,
  Text,
  Wrapper
} from './styled'

export const CheckoutFinalizar = () => {
  // STATE
  const { data, loading } = useStatusOrdersClient()
  const handleContact = ({ getOneStore, ref }) => {
    const { storePhone } = getOneStore
    window.open(`https://api.whatsapp.com/send?text='Hola, mi pedido es ${ref}'?phone=${storePhone}`)
  }
  if (loading) {
    return <span>Loading</span>
  }
  if (!loading && !data.length > 0) {
    return (
      <div>
        <Text>Aun no tienes pedidos</Text>
      </div>
    )
  }
  return (
    <Wrapper>
      {!!data && data?.map((x, i) => {
        const { getOneStore } = x
        return (
          <div className='wrapper-column' key={i + 1}>
            <div className='animation-container'>
              <Text># {x.pCodeRef}</Text>
            </div>
            <div >
              <div className='wrapper-content' key={x.pCodeRef}>
                {x.pSState === 5
                  ? <div>
                    <StatusItemOrderProcess
                      data={x.pDatMod}
                      pulse={false}
                      text={'El pedido fue rechazado'}
                    />
                  </div>
                  : <OlList>
                    {x.pSState === 0 && <StatusItemOrderProcess
                      data={x.pDatMod}
                      pulse={x.pSState === 0}
                      text={'Pedido en estado de confirmación'}
                    />}
                    {x.pSState >= 1 && <StatusItemOrderProcess
                      data={x.pDatMod}
                      pulse={x.pSState === 1}
                      text={'Aceptado'}
                    />}
                    {x.pSState >= 2 && <StatusItemOrderProcess
                      data={x.pDatMod}
                      pulse={x.pSState === 2}
                      text={'Pedido en proceso'}
                    />}
                    {x.pSState >= 3 && <StatusItemOrderProcess
                      data={x.pDatMod}
                      pulse={x.pSState === 3}
                      text={'listo para entrega'}
                    />}
                    {x.pSState >= 4 && <StatusItemOrderProcess
                      data={x.pDatMod}
                      pulse={x.pSState === 4}
                      text={'Pedido concluido'}
                    />}
                  </OlList>
                }
                <DisRestaurant>
                  <Text margin='12px 0 0 5px' size='19px'>{getOneStore?.storeName}</Text>
                  <Link href={`/delivery/${encodeURIComponent(getOneStore?.city?.cName?.toLocaleLowerCase())}-${encodeURIComponent(getOneStore?.department?.dName?.toLocaleLowerCase())}/${encodeURIComponent(getOneStore?.storeName)}/${getOneStore?.idStore}`}>
                    <Anchor>
                                            Ir a la tienda
                    </Anchor>
                  </Link>
                  <div className='dish-restaurant__divisor'></div>
                  <button> Enviar mensaje</button>
                  <ContentShare >
                                        Contactar
                    <ContainerShare>
                      <Flex>
                        <div className='icon-WhatsApp'>
                          <IconWhatsApp color={BGColor} size='20px' />
                        </div>
                        <button onClick={() => { return handleContact({ getOneStore, ref: x.pCodeRef }) }}> Contactar en WhatsApp</button>
                      </Flex>
                    </ContainerShare>
                  </ContentShare>
                  <label className='dish-observation-form__label' tabIndex='0' >¿Ocurrió algo? Contacta el restaurante +57 {getOneStore?.storePhone}</label>
                </DisRestaurant>
              </div>
            </div>
          </div>
        )
      })}
    </Wrapper>
  )
}
export const StatusItemOrderProcess = ({
  pulse,
  text,
  data
}) => {
  return (
    <FeedItem pulse={pulse}>
      <span className='activity-text'>{text}</span>
      <div>
        <span className='text-info'>{text}</span>
        <span className='date'>{moment(data).format('DD/MM/YYYY')}</span>
      </div>
    </FeedItem>
  )
}

StatusItemOrderProcess.propTypes = {
  data: PropTypes.any,
  pulse: PropTypes.any,
  text: PropTypes.any
}
