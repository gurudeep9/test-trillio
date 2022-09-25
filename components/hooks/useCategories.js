import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { GET_ALL_CATEGORIES } from '../../container/Update/Categories/queries'

export const useCategories = () => {
  const { data, loading } = useQuery(GET_ALL_CATEGORIES)
  const [categories, setCategories] = useState(data)
  useEffect(() => {
    setCategories(categories)
  }, [data])
  return [data, { loading }]
}
