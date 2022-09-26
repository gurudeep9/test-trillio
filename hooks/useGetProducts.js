import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_ALL_PRODUCTS } from '../../container/Update/Products/queries'

export const useGetProducts = () => {
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS)
  const [products, setProducts] = useState(data)
  //  const { setAlertBox } = useContext(Context)
  useEffect(() => {
    setProducts(products)
    if (error) return
  }, [data, error, products])
  return [data, { loading }]
}
