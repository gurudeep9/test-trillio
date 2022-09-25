import { useApolloClient } from '@apollo/client'
import { OUR_URL_BASE } from 'apollo/urls'
import ActiveLink from 'components/common/Link'
import { useUser } from 'components/hooks/useUser'
import { PColor } from 'public/colors'
import {
  IconLogout,
  IconLove,
  IconUser
} from 'public/icons'
import React, { useCallback } from 'react'
import {
  CicleUser,
  NavHeaderMenuMobileContent,
  Anchor
} from './styled'

export const NavHeaderMobile = ({ menuMobile }) => {
  const [dataUser] = useUser()
  const { client } = useApolloClient()
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
  }, [client])
  return (
    <NavHeaderMenuMobileContent height={menuMobile === true ? '70%' : '0'}>
      <div>
        <CicleUser>
          {dataUser?.username?.slice(0, 2)}
        </CicleUser>
        <span>Hola, {dataUser?.username}</span>
        <div className='nav-header-menu-mobile'>
          <ActiveLink activeClassName='active' href='/restaurantes'>
            <Anchor><IconUser color={'#ccc'} size='30px' /> Inicio</Anchor>
          </ActiveLink>
          <ActiveLink activeClassName='active' href='/historial'>
            <Anchor><IconUser color={'#ccc'} size='30px' />Historial</Anchor>
          </ActiveLink>
          <ActiveLink activeClassName='active' href='/favoritos'>
            <Anchor><IconLove color={'#ccc'} size='30px' />favoritos</Anchor>
          </ActiveLink>
          <ActiveLink activeClassName='active' href='/profile'>
            <Anchor><IconUser color={'#ccc'} size='30px' />Mi cuenta </Anchor>
          </ActiveLink>
          <ActiveLink activeClassName='active' href='/ayuda'>
            <Anchor><IconUser color={'#ccc'} size='30px' />Ayuda / PQR </Anchor>
          </ActiveLink>
          <ActiveLink activeClassName='active' href='/categorias'>
            <Anchor><IconUser color={'#ccc'} size='30px' />Categorías </Anchor>
          </ActiveLink>
          <button onClick={() => { return onClickLogout() }}>
            <IconLogout color={PColor} size='20px' />
          </button>
        </div>
      </div>
    </NavHeaderMenuMobileContent>
  )
}
