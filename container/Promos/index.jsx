import { Container } from './styled'
import { CardProductSimple } from 'pkg-components'

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
  return (
    <Container>
      {data.map((x, i) => {
        return (
          <CardProductSimple
            ProPrice={0}
            key={x.name + i}
          />
        )
      })}
    </Container>
  )
}
