import {
  Card,
  Container,
  Span,
  Image,
  WarpperImage,
  Buton
} from './styled'
import { IconArrowRight } from '../../public/icons'
export const Promos = () => {
  const data = [
    {
      name: 'Cóctel Granizado Crema De Whisky Cremoso',
      price: 3000000
    },
    {
      name: 'Cóctel Granizado Crema De Whisky Cremoso'
    },
    {
      name: 'Cóctel Granizado Crema De Whisky Cremoso'
    },
    {
      name: 'Cóctel Granizado Crema De Whisky Cremoso'
    }
  ]
  const handleClick = () => {
    console.log('first')
  }
  return (
    <>
      <br />
      <br />
      <br />
      <br />
      <Buton onClick={handleClick}>Ordenar</Buton>
      <Buton><IconArrowRight color='red' size='20px' />Ordenar</Buton>
      <Buton>Ordenar</Buton>
      <Buton>Ordenar</Buton>
      <Buton>Ordenar</Buton>
      <Buton>Ordenar</Buton>
      <Buton>Ordenar</Buton>
      <Buton>Ordenar</Buton>

      <Container>
        {data.map((x, i) => {
          return (
            <Card display='Hola' key={i} >
              <WarpperImage>
                <Image alt='' src='https://www.clara.es/medio/2021/12/16/que-comer-hoy_1962056a_1280x1167.jpg' />
              </WarpperImage>
              <Span>{x.name}</Span>
              <Span>{x.price}</Span>
            </Card>
          )
        })}
      </Container>
    </>
  )
}
