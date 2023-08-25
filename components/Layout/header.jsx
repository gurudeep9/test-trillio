import React from 'react'
import styled from 'styled-components'
import {
  useScrollHook,
  useScrollColor,
  useScrollY
} from 'npm-pkg-hook'

import { AdicionalComponent } from './styled'
import { ActiveLink } from 'pkg-components'
import { IconLogo } from '../../public/icons'
import { PColor } from '../../public/colors'

export const Header = () => {
  const style = useScrollHook()
  const { offsetY } = useScrollY()
  const { scrollNav } = useScrollColor()

  return (
    <HeaderC scrollNav={scrollNav} style={style} >
      <>
        <div style={{ transform: `translateX(${offsetY * 0.8}px)` }} >
          <ActiveLink href={'/'}>
            <a>
              <IconLogo color={PColor} size='80px' />
            </a>
          </ActiveLink>
        </div>
        <AdicionalComponent>
        </AdicionalComponent>
      </>
    </HeaderC>
  )
}

export const HeaderC = styled.header`
    display: flex;
    height: auto;
    grid-area: head;
    background-color: ${({ scrollNav }) => { return (scrollNav ? 'none' : 'transparent') }};
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding: 0px 20px;
    display: flex;
    height: 80px;
    box-shadow: inset 0 -1px 0 #dcdcdc;
    padding: 0;
    @media (min-width: 992px) {
    }
    `
