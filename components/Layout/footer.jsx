import React from 'react'
import { Anchor, FooterComponent, Text } from './styled'
import { ActiveLink, IconShopping } from 'pkg-components'
import {
  IconHome,
  IconSearch,
  IconUser
} from '../../public/icons'
import { PColor } from '../../public/colors'
export const Footer = () => {
  return (
    <FooterComponent>
      <ActiveLink activeClassName='active' href='/restaurantes'>
        <Anchor><IconHome color={PColor} size='20px' />&nbsp;<Text>Inicio</Text></Anchor>
      </ActiveLink>
      <ActiveLink activeClassName='active' href='/search'>
        <Anchor><IconSearch color={PColor} size='20px' />&nbsp;<Text>Explorar</Text></Anchor>
      </ActiveLink>
      <ActiveLink activeClassName='active' href='/config'>
        <Anchor><IconShopping color={PColor} size='20px' />&nbsp;<Text>Pedidos</Text></Anchor>
      </ActiveLink>
      <ActiveLink activeClassName='active' href='/profile'>
        <Anchor><IconUser color={PColor} size='20px' />&nbsp;<Text>Perfil</Text></Anchor>
      </ActiveLink>
    </FooterComponent>
  )
}
