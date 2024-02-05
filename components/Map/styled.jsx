import { BColor, BGColor, DarkSilver } from 'public/colors'
import styled, { css } from 'styled-components'

export const Card = styled.div`
    width: 100%;
    padding: 5px;
    margin: 0;
`
export const BtnAddressContainer = styled.div`
  display: flex;
    align-content: space-around;
    align-items: center;
    justify-content: flex-start;
    width: 93%;
    margin: auto;
`
export const Address = styled.div`
    grid-gap: 4px;
    gap: 4px;
    display: grid;
    text-align: left;
    align-content: center;
    flex-grow: 1;
    transition: all .2s ease-in-out;
    word-break: break-word;
    color: ${DarkSilver};
    margin: 10px;
    span {
      color: #a6a6a6;
      font-family: PFont-Light;
      line-height: 18px;
      font-size: 14px;
    }
    .main_text--location {
      color: ${DarkSilver};
      word-break: break-word;
      font-size: 16px;
    }
`
export const Between = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`
export const Span = styled.span`
    font-size: 17px;
    font-family: PFont-Regular;
    text-align: center;
    width: 100%;
    display: block;
`
export const Div = styled.div`
    width: 100%;
`

export const Select = styled.select`
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #dcdcdc;
  padding: 13px 20px;
  height: 48px;
  color: var(--color-text-gray-light);
  width: 100%;
  background-color: #fff;
`
export const ListTask = styled.div`
    transition: all 200ms ease-in-out;
    display: flex;
    margin-left: 200px;
    justify-content: center;
    align-items: center;
    font-size: 16px !important;
    font-family: PFont-Light;
  ${({ show }) => {
    return show
      ? css` margin-left: 200px; `
      : css`margin-left: 30px; `
  }}
`
export const ContainerTask = styled.div`
    position: relative;
    align-items: center;
    display: flex;
    flex-direction: space-between;
    border-radius: 8px;
    border: 1px solid #e9e9e9;
    width: 95%;
    min-height: 40px;
    padding: 15px;
    background: transparent;
    overflow: hidden;
    text-decoration: none;
    height: auto;
    opacity: 1;
    cursor: pointer;
    margin: 10px  auto;

    ${props => { return props.selected && css`  border-color: red; ` }}
    &:hover{
        box-shadow: 0px 4px 10px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 8%);
    }
    ${({ show }) => {
    return show &&
      css`
        box-shadow: 0px 4px 10px rgb(0 0 0 / 5%), 0px 4px 16px rgb(0 0 0 / 8%);
        border-color: red;`
  }}
`

export const Button = styled.button`
    outline: none;
    background: transparent;
    cursor: pointer;
`
export const OptionsFunction = styled.div`
    position: absolute;
    display: grid;
    transition: all 200ms ease-in-out;
    display: flex;
  ${({ show }) => {
    return show
      ? css`
                  visibility: visible;
                  opacity: 1;
                  transform: translateX(0);
              `
      : css`
                
                  margin: 0;
                  visibility: hidden;
                  opacity: 0;
                  transform: translateX(-50px);
              `
  }}
    @media only screen and (min-width: 960px){
    }
`

export const Container = styled.div`
  background-color: ${BGColor};
  position: absolute;
  width: ${({ width }) => { return width || '100%' }};
  height: 100%;
  padding-bottom: 100px;
  transition: 200ms ease-in-out;
${({ modal }) => {
    return modal
      ? css`  
    transform: translateY(95px);
    border-radius: 4px;
    top: -100px;
        `
      : css`
      z-index: -10000;
      opacity: 0;
              `
  }}
        .card {
  display: grid;
  height: auto;
  opacity: 1;
  overflow: visible;
  h2 {
    color: var(--color-text-gray-light);
    font-size: 1.125rem;
    line-height: 22px;
    font-family: PFont-Light;
    text-align: center;
    margin: 30px 0;
  }
      }
      .flex-center{
        display: flex;
        flex: 1 1 0%;
        align-items: center;
      }
      .content-location {
        overflow-y: auto;
        overflow-x: hidden;
        height: 100%;
        padding: 20px;
        h2 {
          text-align: center;
          margin: 30px 0;
          font-size: 24px;
          font-weight: 400;
          font-family: PFont-Light;
          color: ${BColor};
        }
        &::-webkit-scrollbar {
                width: 3px;
                background-color: #dcdcdc;
                border-radius: 5px;
            }
      }
`
export const Text = styled.span`
    width: 100%;
    font-family: PFont-Regular;
    color: var(--color-text-gray-light);
    font-size: 1.125rem;
    line-height: 22px;
    text-align: center;
`
export const AwesomeModal = styled.div`
    width: 700px;
    border-radius: 10px;
    z-index: 99999;
    display: flex;
    max-height: 584px;
    width: 694px;
    flex-direction: column;
    transition: 500ms ease;
    overflow-x: hidden;
    overflow-y: hidden;
    position: fixed;
    left: 0;
    right: 0;
    margin: auto;
    height: calc(100vh - 100px);
    top: 80px;
    ${({ showModal }) => {
    return showModal
      ? css`  
      transform: translateY(0%);
      `
      : css`
      transform: translateY(50%);
              `
  }}
  
`
export const ContainerModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 8880;
    background-color:rgba(0, 0, 0, 0.322);
    ${({ showModal }) => {
    return showModal
      ? css`  
        visibility: visible;
        
        `
      : css`
          visibility: hidden;
          opacity: 0;
              `
  }}
    `
export const ContainerMap = styled.div`
    position: absolute;
    transition: 500ms ease;
    top: 0;
    bottom: 0;
    ${({ modal }) => {
    return modal
      ? css`  
            transform: translateY(0px);
            border-radius: 4px;
        
        `
      : css`
          z-index: -10000;
          opacity: 0;
              `
  }}
`
export const ContentAlert = styled.div`
    position: absolute;
    align-items: center;
    width: calc(100% - 40px);
    max-width: 480px;
    height: auto;
    top: 80px;
    background-color: #ef5753;
    border-radius: 4px;
    padding: 12px;
    box-shadow: 0 4px 4px rgb(0 0 0 / 5%);
    color: #fff;
    font-size: .875rem;
    line-height: 1.125rem;
    transition: all .15s ease-in;
    margin: auto;
    display: flex;
    left: 0;
    right: 0;
    z-index: 99999;
`
export const MapHeader = styled.div`
    width: 100%;
    top: 0;
    left: 0;
    position: fixed;
    grid-template-columns: 50px 1fr 50px;
    padding: 27px 20px;
    z-index: 99;
    background: linear-gradient(0deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.8) 25%, white 100%);
`
export const ContentButton = styled.div`
    width: 80%;
    position: absolute;
    margin: auto;
    display: flex;
    left: 0;
    right: 0;
    justify-content: center;
    z-index: 99999;
    bottom: 30px;
    /* bottom: -550px; */
`
