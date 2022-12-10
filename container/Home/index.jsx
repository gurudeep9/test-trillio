import { useEffect, useState } from 'react'
import { PColor } from '../../public/colors'
import { IconCancel, IconTicker, IconLogo, IconSearch } from '../../public/icons'
import { Body, BtnNav, Header, Box, ContainerBtn, Text, ContentHeader, BoxJr, Anchor, HeaderContent, ContentInputSearch, ButtonSearch, ScrollbarContainer, ContentImgs, Section, Acquisition, BoxLi } from './styled'
import Link from 'next/link'
import { useRouter } from 'next/router'

export const Home = () => {
  const [close, setClose] = useState(false)
  const [name, setName] = useState(false)
  const location = useRouter()
  function capFirst (string) {
    if (typeof string !== 'undefined') {
      return string?.charAt(0)?.toUpperCase() + string?.slice(1)
    }
  }

  function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min)) + min
  }
  useEffect(() => {
    const name1 = ['Comida china', 'arroz', 'Pollo', 'Comida']
    const name = capFirst(name1[getRandomInt(0, name1.length + 1)])
    setName(name)
  }, [])
  const dataArray = [
    {
      name: 'Comida 1'
    },
    {
      name: 'Comida 2'
    },
    {
      name: 'Comida 3'
    },
    {
      name: 'Comida 4'
    },
    {
      name: 'Comida 4'
    },
    {
      name: 'Comida 5'
    }
  ]
  return <div>
    <Body>
      <ContentHeader>
        <Header>
          <div></div>
          <nav>
            <BtnNav href='/entrar'>
              <Anchor color hover >
                                Repartidor
              </Anchor>
            </BtnNav>
            <BtnNav href='/restaurantes'>
              <Anchor color hover >Restaurante</Anchor>
            </BtnNav>
            <ContainerBtn>
              <BtnNav href='/entrar'>
                <Anchor BgColor>
                                    Entrar
                </Anchor>
              </BtnNav>
              <Box close={close}>
                <BoxJr>
                  <IconTicker size='60px' />
                </BoxJr>
                <BoxJr>
                  <Text className='landing-sign-up-voucher__texts__title'>Gane cupones!</Text>
                  <p className='landing-sign-up-voucher__texts__description'>Crea tu cuenta para tener acceso a descuentos</p>
                  <button className='btn-btn-primary'>
                    <span className='btn__label'>Crear cuenta</span>
                  </button>
                </BoxJr>
                <button className='btn-btn-sec' onClick={() => { return setClose(!close) }}>
                  <IconCancel color={PColor} size='15px' />
                </button>
              </Box>

            </ContainerBtn>
          </nav>
          <HeaderContent>
            <div className='grid-content'>
              <div></div>
              <div className='flex-center'>
                <IconLogo color={PColor} size='140px' />
              </div>
              <div></div>
            </div>
            <div>
              <h1>¡Pedir  <strong> {name}  </strong> nunca ha sido tan fácil</h1>
              <h3>Encuentra restaurantes cerca de ti</h3>
            </div>

            <div className='ContentSearch'>
              <ContentInputSearch onClick={() => { return location.push('/restaurantes') }}>
                <IconSearch color={PColor} size='30px' />
                <input placeholder='Buscar' />
              </ContentInputSearch>
              <ButtonSearch
                onClick={() => { return location.push('/') }}
                role='button'
                type='button'
              >Buscar</ButtonSearch>
            </div>
            <ScrollbarContainer>

              {dataArray
                ? dataArray.map(x => {
                  return (
                    <div className='BtnTarget'># {x.name}</div>
                  )
                })
                : <div>No data</div>}
            </ScrollbarContainer>
          </HeaderContent>
        </Header>
      </ContentHeader>
      <Section>
        <ContentImgs>
          <div className='contentimg'></div>
          <div className='contentimg'></div>
          <div className='contentimg'></div>
        </ContentImgs>
      </Section>
      <Section>
        <Acquisition>
          <BoxLi>
            <img
              alt='Verifica las vacantes abiertas'
              className='landing-acquisition__card-img'
              src=''
            />
            <span className='landing-acquisition__card-title'>Tu hambre de crecer está en iFood</span>
            <span className='landing-acquisition__card-subtitle'>Registra tu restaurante</span>
          </BoxLi>
          <BoxLi>
            <img
              alt='Verifica las vacantes abiertas'
              className='landing-acquisition__card-img'
              src=''
            />
            <span className='landing-acquisition__card-title'>Tu hambre de crecer está en iFood</span>
            <span className='landing-acquisition__card-subtitle'>Registra tu restaurante</span>
          </BoxLi>
          <BoxLi>
            <img
              alt='Verifica las vacantes abiertas'
              className='landing-acquisition__card-img'
              src=''
            />
            <span className='landing-acquisition__card-title'>Tu hambre de crecer está en iFood</span>
            <span className='landing-acquisition__card-subtitle'>Registra tu restaurante</span>
          </BoxLi>
        </Acquisition>
      </Section>
    </Body>
  </div>
}
