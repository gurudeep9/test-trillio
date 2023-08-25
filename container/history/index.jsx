import PropTypes from 'prop-types'
import React from 'react'
import { Container, Title } from './styled'
import Link from 'next/link'
import { Table, Section } from 'pkg-components'
import moment from 'moment'
import styled from 'styled-components'
import { PColor, PLColor } from '../../public/colors'

export const Historial = ({ dataFav }) => {
  return (
    <Container>
      <Container>
        <Title>Restaurante favoritos </Title>
      </Container>
      <Table
        data={dataFav}
        labelBtn='Product'
        renderBody={(dataB, titles) => {
          return dataB?.map((x, i) => {
            return <Section
              columnWidth={titles}
              key={i}
              odd
              padding='10px 0'
            >
              <Item>
                <span> {x.getOneStore?.storeName}</span>
              </Item>
              <Item>
                <span> {moment(x.createAt).format('DD/MM/YYYY')} - {moment(x.createAt).format('h:mma')} </span>
              </Item>
              <Item>
                <span> DELIVERY-APP </span>
              </Item>
              <Item>
                <Button>
                  <Link
                    href={`/delivery/${encodeURIComponent(x?.getOneStore.city?.cName?.toLocaleLowerCase())}-${encodeURIComponent(x?.getOneStore?.department?.dName?.toLocaleLowerCase())}/${encodeURIComponent(x?.getOneStore?.storeName?.replace(/\s/g, '-')?.toLocaleLowerCase())}/${x?.idStore}`}
                    passHref
                    shallow
                  >
                    <a>
                                    Ver detalles
                    </a>
                  </Link>
                </Button>
              </Item>
            </Section>
          })
        }}
        titles={[
          { name: 'Restaurante', key: '', justify: 'flex-center', width: '1fr' },
          { name: 'Pedido', key: 'bDescription', justify: 'flex-center', width: '1fr' },
          { name: 'Canal', justify: 'flex-center', width: '1fr' },
          { name: '', justify: 'flex-center', width: '1fr' }
        ]}
      />
    </Container>
  )
}

Historial.propTypes = {
  dataFav: PropTypes.shape({
    getOneStore: PropTypes.any
  })
}
const Button = styled.button`
    color: ${PColor};
    text-decoration: underline;
    background-color: transparent;
    cursor: pointer;
`
const Item = styled.div`
    padding: 15px 1px;
    margin: auto;
    border-radius: 5px;
    display: grid;
    place-content: center;
    & span {
        color: ${PLColor};
    }
`
