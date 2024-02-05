import { BGColor, DarkSilver } from 'public/colors'
import styled from 'styled-components'

export const Card = styled.div`
    background: ${BGColor};
    border-radius: 4px;
    border: 1px solid #f2f2f2;
    box-shadow: 0 1px 4px rgb(0 0 0 / 5%);
    display: grid;
    grid-gap: 15px;
    grid-template-columns: 1fr 146px;
    height: 147px;
    min-height: 190px;
    min-width: 320px;
    overflow: hidden;
    padding: 15px;
    padding: 20px;
    position: relative;
    text-decoration: none;
    transition: .2s;
    width: 100%;
    height: 100%;
    .footer  {
      position: absolute;
      bottom: 15px;
    }
    .card__price, .card__des  {
      font-size: 1rem;
      line-height: 1.25rem;
      font-weight: 400;
      color: var(--color-text-gray-light);
      &:nth-child(2) {
        margin-left: 10px;
      }
    }
    .card__des {
      text-decoration: line-through;
    }
    .card__description {
      list-style: none;
      cursor: pointer;
      box-sizing: border-box;
      color: var(--color-text-gray-light);
      font-weight: 400;
      margin-top: 0;
      font-size: 1.125rem;
      line-height: 1.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &&:hover {
      border: 1px solid #dbdad9;
    }
    .card__description_main {
    font-family: SulSans,Helvetica,sans-serif;
    list-style: none;
    cursor: pointer;
    font-weight: lighter;
    color: ${DarkSilver};
    word-break: break-word;
    margin-bottom: 10px;
    font-size: .875rem;
    line-height: 1.25rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    }
    & img {
      object-fit: cover;
    }
`
