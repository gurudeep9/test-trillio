import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { GET_ALL_CATEGORIES } from '../../container/Update/Categories/queries'

export const useCategories = () => {
  const [categories, setCategories] = useState([])
  const { loading } = useQuery(GET_ALL_CATEGORIES, {
    onCompleted: (data) => {
      setCategories(data)
    }
  })
  return [categories, { loading }]
}
