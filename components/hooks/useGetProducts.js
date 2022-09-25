import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { GET_ALL_PRODUCTS } from '../../container/Update/Products/queries'

export const useGetProducts = () => {
  const [product, setProduct] = useState([])
  const { loading } = useQuery(GET_ALL_PRODUCTS, {
    onCompleted: (data) => {
      setProduct(data)
    }
  })
  return [product, { loading }]
}
