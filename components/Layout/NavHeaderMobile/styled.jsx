import { PColor, SECBGColor } from 'public/colors'
import styled, { css } from 'styled-components'

export const flexCenter = css`
  display: flex;
  align-items: center;
`
export const Anchor = styled.div`
  width: 100%;
  padding: 10px;
  ${flexCenter}
  &.active {
    border-left: 2px solid ${PColor};
    color: ${PColor};
    padding-left: 10px;
    background: ${SECBGColor};
  }
  & > svg {
    padding-right: 10px;
    display: inline-block;
  }
`

export const CicleUser = styled.div`
  width: 40px;
  height: 40px;
  border: solid 1px var(--color-neutral-gray);
  border-radius: 50px;
  place-content: center;
  background-color: var(--color-background-secondary-light);
  ${flexCenter}
`
export const NavHeaderMenuMobileContent = styled.div`
    transform: translateX(0);
    padding: 0 24px;
    position: fixed;
    overflow: hidden;
    height: 100vh;
    top: 0;
    width: 90%;
    background-color: var(--color-base-white);
    padding: var(--spacing-2xl);
    z-index: var(--z-index-99999);
    transition: 0.5s ease-in-out 0s;
    box-shadow: var(--box-shadow-md);
  ${({ active }) => {
    return active && (
      css`
        transform: translateX(-120%);
      `
    )
  }}

    .nav-header-menu-mobile {
    position: relative;
    background: #fff;
    border-bottom: solid 1px #e6e6e6;
    font-size: 14px;
    list-style: none;
    margin: 0;
    padding: 16px 0;
    width: 100%;
  }
`
