import Image from 'next/image'
import Link from 'next/link'
import { useCategoryStore } from 'npm-pkg-hook'
import React from 'react'
import styled from 'styled-components'
import { PColor } from '../../../public/colors'
import { CtnBox } from '../styled'
export const Categories = () => {
  const [getCatStore] = useCategoryStore()
  return (
    <Container>
      <List>
        {getCatStore?.getAllCatStore?.map(cat => {
          const nameCat = cat?.cName?.replace(/\s/g, '-')?.toLowerCase()
          return (
            <CtnBox key={cat.catStore}>
              <Link href={`/categories/${nameCat}/${cat.catStore}`}>
                <a>
                  <ItemCategory>
                    <Image
                      alt='Picture of the author'
                      blurDataURL='data:...'
                      height={90}
                      objectFit='contain'
                      placeholder='blur'
                      src={'/images/cat1.png'}
                      unoptimized={true}
                      width={90}

                    />
                  </ItemCategory>
                  <h2 className='title-cat'>{cat.cName}</h2>
                </a>
              </Link>
            </CtnBox>
          )
        })}
      </List>
      <Link href={'/categorias'}>
        <Anchor>
          Ver todas
        </Anchor>
      </Link>
    </Container>
  )
}

export const Anchor = styled.a`
  color: ${PColor};
  font-size: 12px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`
export const Container = styled.div`
  text-align: end;
`
export const ItemCategory = styled.div`
    width: 100%;
    border-radius: 3% ;
    height: 100px;
    align-items: center;
    display: grid;
`
export const List = styled.div`
    width: 100%;
    display: grid;
    gap: 5px;
    grid-auto-flow: column;
    place-content: space-around;
    padding: 0 20px;
    overflow: hidden;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));

    .title-cat {
        margin-top: 10px;
        font-size: 14px;
        font-family: PFont-Light;
        font-weight: 400;
    }
`
