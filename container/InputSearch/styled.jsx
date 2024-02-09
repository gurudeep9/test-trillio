import {
  BColor,
  BGColor,
  DarkSilver,
  PLColor,
  SECBGColor
} from 'public/colors'
import styled, { css } from 'styled-components'

export const ContentInputSearch = styled.div`
  display: flex;
  padding: 10px;
  margin: 0;
  display: flex;
  place-content: center;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
  ${({ focus }) => {
    return (
      focus &&
      css`
        position: fixed;
        right: 0;
        height: 80px;
        z-index: 999;
        width: 90%;
        left: 0;
        margin: auto;
        top: -5px;
      `
    )
  }}
  @media(max-width: 768px) {
    .btn {
      display: none;
    }
  }
  .btn {
    background-color: transparent;
    cursor: pointer;
  }
`
export const SearchTarget = styled.div`
  position: absolute;
  z-index: 9998;
  width: 100%;
  left: 0;
  right: 0;
  height: min-content;
  border-radius: 8px;
  top: 80px;
  z-index: 99898;
  box-shadow: 1px 0px 23px -10px rgb(0 0 0 / 38%);
  background-color: ${BGColor};
  border-radius: 8px;
  display: ${({ values }) => {
    return values ? 'block' : 'none'
  }};

  button {
    border-bottom: 1px solid #d4d2d2;
    padding: 10px 5px;
    display: flex;
    width: 95%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    background: transparent;
    cursor: pointer;
    span {
      font-size: 0.875rem;
      color: ${DarkSilver};
    }
    .recent {
      display: block;
      padding: 10px 5px !important;
      width: 95%;
      @media only screen and (max-width: 768px) {
        display: none;
      }
    }
  }
  .recent-span {
    color: ${BColor};
    font-weight: 300;
    line-height: 29px;
    list-style: initial;
    font-family: PFont-Light;
    margin: 0 25px;
    font-size: 17px;
    display: block;
  }
  .item-recent {
    padding: 10px 5px;
    margin: 10px;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    width: 90%;
    margin: auto;
    align-items: center;
  }
  @media only screen and (max-width: 768px) {
    display: none !important;
  }
`
export const Button = styled.button`
  border-bottom: none !important;
  width: min-content !important;
  margin: 0 !important;
`
export const Input = styled.input`
  background: var(--color-alvi-primary-background-blue);
  border-radius: 8px;
  border: none;
  color: ${`${PLColor}`};
  display: flex;
  font-size: 1rem;
  font-weight: 300;
  height: 48px;
  line-height: 1.25em;
  margin-left: 10px;
  min-width: 320px;
  outline: none;
  padding-left: 20px;
  padding-right: 0;
  width: 100%;
  &:focus ~ ${SearchTarget} {
    display: block;
  }
  @media (max-width: 768px) {
    min-width: 100%;
    font-size: 12px;
    padding-left: 13px;
    position: absolute;
  }
`
