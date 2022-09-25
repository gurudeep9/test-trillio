import styled, { css, keyframes } from 'styled-components'
import { 
  APColor, 
  BGColor, 
  PColor,
  BColor,
  PLVColor
} from '../../public/colors'
export const Flex = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`

export const Text = styled.h3`
    display: flex;
    font-family: ${({ font }) => {return font || 'PFont-Light'}};
    word-break: break-word;
    font-size: 2em;
    font-weight: 400;
`
export const Anchor = styled.a`
    text-decoration: underline !important;
    background-color: transparent;
    cursor: pointer;
    color: ${PColor};
    font-size: .989em;
`
export const DisRestaurant = styled.div`
    border-radius: 4px;
    border: 1px solid rgba(63,62,62,.1);
    display: flex;
    flex-direction: column;
    height: auto;
    margin: 20px auto;
    padding: 11px 20px;
    padding: 15px;
    width: 100%;
    .dish-observation-form__label {
      color: #717171;
      font-size: 1rem;
      font-weight: 500;
      line-height: 1.15;
    }
    .dish-restaurant__header {
      align-items: center;
      cursor: pointer;
      display: flex;
      font-size: 16px;
      justify-content: space-between;
      line-height: 1.15;
    }
    .dish-restaurant__divisor {
      border-top: 2px dashed #f2f2f2;
      box-sizing: border-box;
      cursor: pointer;
      font-size: 16px;
      line-height: 1.15;
      margin: 8px 0;
    }
`
export const ContainerShare = styled.div`
  position: absolute;
  height: min-content;
  display: none;
  width: 240px;
  box-shadow: 0 0 1.5rem rgb(18 38 63 / 9%);
  z-index: 99;
  background-color: ${BGColor};
  border-radius: 10px;
  padding: 6px;
  bottom: 17px;
  transition: all .5s ease;
  .icon-WhatsApp {
    background-color: #01e675;
    border-radius: 50%;
    height: 30px;
    min-height: 30px;
    max-height: 30px;
    width: 30px;
    min-width: 30px;
    max-width: 30px;
    display: flex;
    place-content: center;
    align-items: center;
  }
  .icon-face {
    align-items: center;
    background-color: ${PLVColor};
    border-radius: 50%;
    display: flex;
    height: 30px;
    max-height: 30px;
    max-width: 30px;
    min-height: 30px;
    min-width: 30px;
    place-content: center;
    width: 30px;
  }
  &::after {
  content: " ";
  position: absolute;
  top: 100%; /* At the bottom of the tooltip */
  right: 10px;
  margin-left: -10px;
  border-width: 10px;
  border-style: solid;
  border-color: ${BGColor} transparent transparent transparent;
}
  button {
    color: ${BColor};
    padding: 10px;
    transition: .5 ease;
    width: 100%;
    cursor: pointer;
    background-color: ${BGColor};
  }
  button:hover {
    background-color: #ededed69;
  }
  `
export const ContentShare = styled.div`
    position: relative;
    cursor: pointer;
    color: red;
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    margin: 0;

    display: flex;
    justify-content: flex-end;
    position: relative;
    &:hover  > ${ContainerShare} {
        display: block;
    }
` 
export const Wrapper = styled.div`
    width: 100%;
    max-width: 1366px;
    min-width: 1366px;
    margin: 100px auto;
    .animation-container{
      margin: 100px auto;
    }
    .wrapper-content {
      height: 80vh;
    }
    .wrapper-column {
      margin-top: 10px;
      display: flex;
      flex-wrap: nowrap;
      border-bottom: 1px solid #7575756b;
      @media(max-width: 960px){
        flex-wrap: wrap;
      }
    }
    .wrapper-column:last-child {
      border-bottom:none;

    }
`
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 ${APColor};
  }
  70% {
      box-shadow: 0 0 0 10px rgba(204,169,44, 0);
  }
  100% {
      box-shadow: 0 0 0 0 rgba(204,169,44, 0);
  }
`
export const OlList = styled.ol`
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #212529;
    text-align: left;
    word-wrap: break-word;
    box-sizing: border-box;
    outline: none !important;
    margin-top: 0;
    margin-bottom: 0!important;
    padding: 15px 15px 0 15px;
    list-style: none;
`
export const FeedItem = styled.li`
    font-size: 2rem;
    font-weight: 500;
    line-height: 1.5;
    color: #212529;
    font-family: PFont-Light;
    word-wrap: break-word;
    list-style: none;
    position: relative;
    padding-bottom: 20px;
    padding-left: 30px;
    border-left: 2px solid #e4e8eb;
    .text-info {
        font-size: 17px;
    }
    .date {
      display: block;
      position: relative;
      top: -5px;
      color: #8c96a3;
      text-transform: uppercase;
      font-size: 13px;
    }
    .activity-text{
      position: relative;
      top: -3px;
    }
    &:after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: -13px;
    width: 20px;
    height: 20px;
    border-radius: 50%  ;
    background: #ffffff;
    border: 1px solid ${PColor};
    ${props => {return props.pulse && css`
    border: 1px solid ${APColor};
    animation: ${pulse} 2s infinite; 
    background-color: ${APColor} ;

    `}}

}
`