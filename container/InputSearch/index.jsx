import { PColor } from 'public/colors'
import { IconSearch } from 'public/icons'
import { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { ContentInputSearch, Input } from './styled'

export const InputSearch = () => {
  const location = useRouter()
  const ref = useRef()
  const [values, setValues] = useState({})

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleSearch = (elem, type, selected) => {
    ref.current.focus()
    if (elem) return location.push(`/buscar/${elem}/${type}`)
    if (!values.search || values.search === ' ') return null
    if (selected) {
      location.push(`/buscar/${values.search}/${type}`)
    }
    return null
  }
  const [focus, setFocus] = useState(false)

  return (<ContentInputSearch focus={focus}>
    <button className='btn btn-primary' onClick={() => { return handleSearch(null, 'TODO', true) }}>
      <IconSearch color={PColor} size='20px' />
    </button>
    <Input
      aria-label='Busca por platillo o restaurante'
      name='search'
      onBlur={() => { return setFocus(false) }}
      onChange={(e) => { return handleChange(e) }}
      onFocus={() => { return setFocus(true) }}
      onPress={(e) => {
        if (e.key === 'Enter') {
          handleSearch(null, 'TODO', true)
          e.target.blur()
        }
      }}
      placeholder={`Buscar en ${process.env.BUSINESS_TITLE || ''}`}
      ref={ref}
      role='search'
      tabIndex={'0'}
      type='text'
      value={''}
    />
  </ContentInputSearch>)
}
