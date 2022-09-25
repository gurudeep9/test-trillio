import React, { useCallback, useContext, useEffect, useState } from 'react'
import Link from '../common/Link'
import styled, { css } from 'styled-components'
import { BGColor, PColor } from '../../public/colors'
import { useApolloClient } from '@apollo/client'
import { ButtonOption, FloatingBoxTwo, Button, ButtonOptionFav, Count } from './styled'
import { IconArrowBottom, IconLogout, IconShopping, IconUser } from '../../public/icons'
import { useRouter } from 'next/router'
import { Context } from '../../context'
import { OUR_URL_BASE } from '../../apollo/urls'
import { useUser } from 'components/hooks/useUser'
import { Overline } from 'components/common/Reusable'
import { ContainerActions, ContainerBurger, OnlyMovil } from 'components/Update/Products/styled'

export const Options = ({ handleMenu }) => {
  const { client } = useApolloClient()
  const { itemProducts, setOpenMenuMobile, menuMobile, setStatus, status } = useContext(Context)
  const [show, setShow] = useState(false)
  const location = useRouter()
  // const onClickLogout = () => {
  //     client?.clearStore()
  //     location.replace('/')
  // }

  const onClickLogout = useCallback(async () => {
    localStorage.removeItem('location.data')
    await window
      .fetch(`${OUR_URL_BASE}auth/logout/`, {})
      .then(res => {
        if (res) {
          client?.clearStore()
          location.replace('/')
        }
      })
      .catch(() => {
        return {}
      })
  }, [client, location])

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
    setShow(false)
  }, [location])
  // activa el menu de configuraciones del perfil

  const handleOpenMenu = () => {
    setOpenMenuMobile(!menuMobile)
    setStatus(status === 'open' ? 'close' : 'open')
  }
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
            <span className={status}></span>
            <span className={status}></span>
            <span className={status}></span>
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
          <Name>Hola, {dataUser?.username}</Name>
          <Enlace href='/profile'>
            <a>
              <Button type='button'>
                <IconUser color={PColor} size='25px' />
              </Button>
            </a>
          </Enlace>
          <Enlace href='/historial'>
            <a>
              <Button type='button'>
                <IconShopping color={PColor} size='25px' />
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
      <ButtonOptionFav onClick={() => { return handleClick(2) }} >
        <Button type='button'>
          <IconArrowBottom color={PColor} size='15px' />
        </Button>
      </ButtonOptionFav>
      <ContainerOption>
        <FloatingBoxTwo show={show === 2}>
          <Enlace href='/historial'>
            <a>
              <Button type='button'>
                <IconShopping color={PColor} size='25px' />
              </Button>
            </a>
          </Enlace>
        </FloatingBoxTwo>
      </ContainerOption>
    </ContainerActions>
  )
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
