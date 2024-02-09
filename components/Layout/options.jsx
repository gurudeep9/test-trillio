import PropTypes from 'prop-types'
import React, {
  useContext,
  useEffect,
  useState
} from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'
import { BGColor, PColor } from '../../public/colors'
import { IconArrowBottom, IconLogout, IconShopping, IconUser } from '../../public/icons'
import { useRouter } from 'next/router'
import { Context } from '../../context'
import { useUser, useLogout } from 'npm-pkg-hook'
import { Overline } from 'pkg-components'
import {
  ButtonOption,
  FloatingBoxTwo,
  Button,
  ButtonOptionFav,
  Count
} from './styled'

export const Options = ({ handleMenu }) => {
  const {
    itemProducts,
    setOpenMenuMobile,
    menuMobile
  } = useContext(Context)
  const [show, setShow] = useState(false)
  const location = useRouter()
  const [onClickLogout] = useLogout()


  useEffect(() => {
    const body = document.body
    body.addEventListener('keyup', e => { return e.code === 'Escape' && setShow(false) })
    return () => { return body.removeEventListener('keyup', () => { return setShow }) }
  }, [setShow])
  const handleClick = index => {
    setShow(index === show ? false : index)
  }
  const [dataUser] = useUser()

  useEffect(() => {
    if (show) {
      setShow(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])
  // activa el menu de configuraciones del perfil

  const handleOpenMenu = () => {
    setOpenMenuMobile(!menuMobile)
  }
  const email = dataUser?.email ? dataUser?.email.split('@')[0] : ''

  return (
    <ContainerActions>
      <Overline onClick={() => { return setShow(!show) }} show={show} />
      <OnlyMovil>
        <ContainerBurger onClick={handleMenu} >
          <div
            className='BurgerMenu__container'
            onClick={() => { return handleOpenMenu() }}
            role='button'
          >
            <span className={menuMobile ? 'open' : 'close'}></span>
            <span className={menuMobile ? 'open' : 'close'}></span>
            <span className={menuMobile ? 'open' : 'close'}></span>
          </div>
        </ContainerBurger>
        <Count onClick={() => { return handleMenu(1) }}>
          <div className='count_product'>
            {itemProducts <= 9 ? itemProducts : '+9'}
          </div>
          <IconShopping color={PColor} size='25px' />
        </Count>
      </OnlyMovil>
      <ButtonOption onClick={() => { return handleClick(1) }}>
        <IconUser color={PColor} size='25px' />
        <LeftNav show={show === 1}>
          <Name>Hola {dataUser?.username ?? email}</Name>
          <Enlace href='/profile'>
            <a>
              <Button type='button'>
                <IconUser color={PColor} size='25px' />
              </Button>
            </a>
          </Enlace>
        </LeftNav>
      </ButtonOption>
      <ButtonOption onClick={onClickLogout}>
        <IconLogout color={PColor} size='20px' />
      </ButtonOption>
      <ButtonOption onClick={() => { return handleMenu(1) }}>
        <div className='count_product'>
          {itemProducts <= 9 ? itemProducts : '+9'}
        </div>
        <IconShopping color={PColor} size='25px' />
      </ButtonOption>
    </ContainerActions>
  )
}

Options.propTypes = {
  handleMenu: PropTypes.func
}
export const Name = styled.span`
    font-weight: 500;
    font-size: 1rem;
    padding: 20px;
    line-height: 1.18;
    padding-bottom: 8px;
    padding-right: 10px;
    word-break: break-word; 
`
export const LeftNav = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    background-color: ${BGColor};
    transition: all 200ms ease 0s;
    background-color: #fff;
    box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%);
    z-index: 999;
    border-radius: 5px;
    // overflow: hidden;
    width: 200px;
    gap: 10px;
    height: auto;
    h2 {
        font-size: 13px;
        font-weight: 500;
        margin: 5% 0;
    }
    top: 52px;
    right: -100px;
    @media (max-width: 768px){ 
        left: 0;
        top: 40.988px;
        width: 100%;
        right: 0;
        margin: auto;
    }
    ${({ show }) => {
    return show
      ? css`
            visibility: visible;
            opacity: 1;
            transform: translateY(0);
                `
      : css`
                
            margin: 0;
            visibility: hidden;
            opacity: 0;
            transform: translateY(-50px);
    `
  }}
`
export const ContainerOption = styled.div`
    width: min-content;
    position: relative;
`

const Enlace = styled(Link)`
    position: relative;
    display: flex;
    width: 100%;
    align-items: center;
    border-radius: 10px;
    &:hover{
        background-color: #1b18181a;
    }
    `

export const ContainerActions = styled.div`
    display: flex;
    align-items: center;
    width: 30%;
    margin: 0 15px;
    @media only screen and (max-width: 768px){
      margin-left: 0;
    }
`
export const OnlyMovil = styled.div`
    display: flex;
    margin: auto;
    width: min-content;
    @media only screen and (min-width: 768px){
        display: none;
    }
`

export const ContainerBurger = styled.div`
   margin: 0 10px 0 auto;
    width: min-content;
    .BurgerMenu__container {
    display: flex;
    margin: 0 10px 0 auto;
    width: min-content;
    align-items: center;
 
    flex-direction: column;    
    span {
      background-color: ${PColor};
      width: 30px;
      height: 1px;
      min-height: 1px;
      max-height: 1px;
      margin: 4px;
      border-radius: 1px;
      transition: all .3s ease-out;
    }
    .open:nth-child(1) {
      transform: rotate(45deg) translateY(4px) translateX(6px);

    }
    .open:nth-child(2) {
      opacity: 0;
    }
    .open:nth-child(3) {
      transform: rotate(-45deg) translateY(-7px) translateX(9px);
    }
}
`
