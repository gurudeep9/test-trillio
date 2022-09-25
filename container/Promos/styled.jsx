import styled from 'styled-components'


export const Buton = styled.button`
  background: #ffff;
  border: 1px solid #ccc;
  border-radius: 30px;
  padding: 20px 30px;
  color :#ccc;
margin-left:20px;
  &:hover {
  border: 1px solid RED;
  }
`
export const Container = styled.div`
    grid-template-columns: repeat(auto-fill, minmax(max(210px, 25% - 32px), 1fr));
    gap: 16px;
    display: grid;
    max-width: 1200px;
    margin: auto; 

    margin-top: 50px;
`

export const Card = styled.div`
width: 100%;
height: 300px;
border-radius: 5px;
border: 1px solid;
/* display: flex; */
${({ display }) => {return console.log(display);} }
flex-direction: column;
justify-content: space-between;
padding: 0px 12px;
flex: 1 1 0%;

`
export const Span = styled.span`
  color: red;
`

export const Image =styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
export const WarpperImage =styled.div`
  height:100px;

`
