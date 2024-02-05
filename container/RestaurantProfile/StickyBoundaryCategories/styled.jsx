import { BGColor, SVColor } from 'public/colors'
import styled from 'styled-components'

export const ContainerCarrusel = styled.div`
  display: grid;
  grid-gap: 28px;
  max-width: 1366px;
  margin: 30px auto 20px;
  @media only screen and (min-width: 960px) {
    grid-template-columns: repeat(2,1fr);
    padding: 0;
  }
  @media only screen and (min-width: 743px) {
    grid-template-columns: repeat(2,minmax(320px,1fr));
    grid-gap: 30px;
    padding: 0 20px; 
  }

`
export const ContentSearch = styled.div`
  max-width: 1366px;
  margin: 0px auto;
  font-size: 1.5rem;
  line-height: 1em;
  flex-grow: 1;
  display: flex;
  place-content: space-between;
  align-items: center;
  font-family: PFont-Light;
  background: ${BGColor};
  button {
    background-color: transparent;
  }
  input {
  margin: 5px auto;
  font-size: 1.5rem;
  line-height: 1em;
  flex-grow: 1;
  display: flex;
  place-content: space-between;
  align-items: center;
  font-family: PFont-Light;
  outline: none;
  border: none;
  border-bottom: 2px solid ${SVColor};
  }
  `

export const Title = styled.h1`
  text-rendering: optimizeLegibility;
  font-family: PFont-Light;
  box-sizing: border-box;
  display: inline;
  color: var(--color-text-gray-light);
  margin: 0 0 2px;
  margin-right: 10px;
  font-weight: 400;
  letter-spacing: -1px;
  font-size: ${({ size }) => { return size || '2.25rem' }};
  line-height: 44px;
  margin-bottom: 0;
  width: fit-content;
  @media only screen and (max-width: 960px) {
    font-size: 1.125rem;
    color: #393a3d;
    font-family: PFont-Regular;
  }
`
