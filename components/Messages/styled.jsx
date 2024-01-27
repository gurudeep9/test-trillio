import { SFColor } from 'pkg-components'
import { BGColor, PColor } from 'public/colors'
import styled from 'styled-components'

export const ContainerContextMessage = styled.div`
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 999;
    width: 472px;
`
export const BoxChat = styled.div`
    bottom: 70px;
    display: block;
    position: fixed;
    right: 70px;
    width: min-content;
`
export const ItemMessage = styled.div`
    position: absolute;
    background-color: ${PColor};
    width: 20px;
    height: 20px;
    left: 0px;
    border-radius: 50%;
    z-index: 9;
    color: ${BGColor};
    text-align: center;
    top: -5px;
`
export const CircleStore = styled.div`
    height: 70px;
    width: 70px;
    border-radius: 50px;
    border: 1px solid ${PColor};
    position: relative;
    margin: auto;
    img {
        border-radius: 50px;
        width: 100%;
        height: 100%;
    }
`
export const Message = styled.div`
    
`
export const Chat = styled.div`
    overflow: hidden scroll;
    height: 100%;
    border-top: 1px solid #ccc;
`
export const ContentAction = styled.div`
position: absolute;
    bottom: 0;
    height: 80%;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    align-items: start;
    input {
        padding: 10px;
        
        outline: none;   
    }
    .header-chat {
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        align-items: self-start;
    }
`

export const TextMessage = styled.span`
    background-color: ${({ messageUser, user }) => { return messageUser === user ? `${SFColor}24` : BGColor }};
    width: fit-content;
    word-break: break-word;
    padding: 10px;
    color: ${SFColor};
    box-shadow: 1px 1px 7px 0px #7171716b;
    ${({ messageUser, user }) => {
    return messageUser === user && `
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 10px;
    `
  }}

    ${({ messageUser, user }) => {
    return messageUser !== user && `
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 10px;
    `
  }}
  .minute-hour {
    font-size: 12px;
    color: #9c9999;
  }
`

export const ContentMessage = styled.div`
    width: 100%;
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 1%;
    padding-bottom: 5%;
    display: flex;
    position: relative;
    justify-content: ${({ messageUser, user }) => { return messageUser === user ? 'flex-end' : 'flex-start' }};
    font-family: 'PFont-Light';
    border-radius: 5px;
    color: ${BGColor};
`
export const WrapperChat = styled.form`
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    overflow: hidden;
    font-size: .9375rem;
    height: 100%;
    background-color: ${BGColor};
    width: 100%;
    transition: all 200ms ease 0s;
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    button {
        background-color: transparent;
    }
    .alert-message {
        align-items: center;
        color: #272323; 
        display: flex;
        font-size: 1rem;
        justify-content: center;
        left: 0;
        margin: auto;
        padding: 20px;
        position: absolute;
        right: 0;
        width: 80%;
    }
`
