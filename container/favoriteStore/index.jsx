import React from 'react'
import { Container, Title } from './styled'
import { useFavoriteStores } from 'npm-pkg-hook'
import { ListRestaurant } from 'container/restaurantes/restaurant'

export const FavoriteStore = () => {
  const [data, { loading, error }] = useFavoriteStores()
  if (loading || error) return <></>

  return (
    <Container>
      <Title>Tus restaurantes Favoritos</Title>
      <ListRestaurant
        data={data}
        like={true}
      />
    </Container>
  )
}
