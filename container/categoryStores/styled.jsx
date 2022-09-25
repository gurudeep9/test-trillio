import styled, { css, keyframes } from 'styled-components'

export const Text = styled.div`
    font-size: ${({ size }) => {return size || '1.7123rem'}};
    text-align: ${({ align }) => {return align || 'start'}};
    color: ${({ color }) => {return color}};
    margin: ${({ margin }) => {return margin}};
`
export const Container = styled.div`
    width: 100%;
    max-width: 1366px!important;
    margin: 100px auto;
    img {
        height: 150px;
        min-height: 150px;
        width: 150px;
        min-width: 150px;
        object-fit: contain;
        margin-right: 20px;
    }

`