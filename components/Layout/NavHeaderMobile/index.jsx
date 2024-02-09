import PropTypes from 'prop-types'
import React, { useCallback } from 'react'
import { useApolloClient } from '@apollo/client'
import {
  ActiveLink,
  BColor,
  IconCategorie,
  IconHome,
  IconLogout,
  IconUser,
  Overline,
  getGlobalStyle
} from 'pkg-components'
import { useUser } from 'npm-pkg-hook'

import { CicleUser, NavHeaderMenuMobileContent, Anchor } from './styled'
import { OUR_URL_BASE } from '@/apollo/urls'
import { PColor } from 'public/colors'

export const NavHeaderMobile = ({ menuMobile, setOpenMenuMobile = () => { } }) => {
  const [dataUser] = useUser()
  const { client } = useApolloClient()
  const onClickLogout = useCallback(async () => {
    localStorage.removeItem('location.data')
    await window
      .fetch(`${OUR_URL_BASE}auth/logout/`, {})
      .then((res) => {
        if (res) {
          client?.clearStore()
          location.replace('/')
        }
      })
      .catch(() => {
        return {}
      })
  }, [client])
  const username = dataUser?.username || ''
  const sliceUserName = username?.slice(0, 2) || ''
  return (
    <>
      <Overline
        bgColor={`${BColor}69`}
        onClick={() => {
          return setOpenMenuMobile(false)
        }}
        show={menuMobile}
        zIndex={getGlobalStyle('--z-index-99999')}
      />
      <NavHeaderMenuMobileContent active={!menuMobile}>
        <div>
          <CicleUser>{sliceUserName}</CicleUser>
          <span>{username ? `Hola, ${username}` : 'Hola'}</span>
          <div className='nav-header-menu-mobile'>
            <ActiveLink activeClassName='active' href='/restaurantes'>
              <Anchor>
                <IconHome
                  color={getGlobalStyle('--color-neutral-gray-dark'
                  )}
                  size={30}
                />{' '}
                Inicio
              </Anchor>
            </ActiveLink>
            <ActiveLink activeClassName='active' href='/profile'>
              <Anchor>
                <IconUser
                  color={getGlobalStyle('--color-neutral-gray-dark'
                  )}
                  size={30}
                />
                Mi cuenta{' '}
              </Anchor>
            </ActiveLink>
            <ActiveLink activeClassName='active' href='/categorias'>
              <Anchor>
                <IconCategorie
                  color={getGlobalStyle('--color-neutral-gray-dark'
                  )}
                  size={30}
                />
                Categorías{' '}
              </Anchor>
            </ActiveLink>
            <button
              onClick={() => {
                return onClickLogout()
              }}
              style={{ background: getGlobalStyle('--color-base-transparent') }}
            >
              <IconLogout color={PColor} size={20} />
            </button>
          </div>
        </div>
      </NavHeaderMenuMobileContent>
    </>
  )
}

NavHeaderMobile.propTypes = {
  menuMobile: PropTypes.bool,
  setOpenMenuMobile: PropTypes.func
}
