import styled from 'styled-components'

export const Container = styled.div`
    grid-template-columns: repeat(auto-fill, minmax(max(210px, 25% - 32px), 1fr));
    gap: 16px;
    display: grid;
    max-width: 1200px;
    margin: auto;
    margin-top: 50px;
`
