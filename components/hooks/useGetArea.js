import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { GET_ALL_AREAS } from '../../gql/Areas'

export const useGetAreas = () => {
  const [areas, setAreas] = useState([])
  const { loading, error } = useQuery(GET_ALL_AREAS, {
    onCompleted: (data) => {
      setAreas(data)
    }
  })
  return [areas, { loading, error }]
}
