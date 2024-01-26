import { PColor } from 'public/colors'
import { IconCancel, IconSearch, IconShopping } from 'public/icons'
import { useEffect, useReducer, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { Button, ContentInputSearch, Input, SearchTarget } from './styled'

export const InputSearch = () => {
  const location = useRouter()
  const [values, setValues] = useState({})
  const [search, setTodos] = useState([])

  const [onkUp, setOnKeyUp] = useState(false)
  const ref = useRef()
  useEffect(() => {
    if (location.pathname === '/buscar/[search]') {
      setOnKeyUp(true)
    } else {
      setOnKeyUp(false)
    }
  }, [])
  const initialState = {
    searchHistory: []
  }
  function favoriteReducer (state, action) {
    switch (action.type) {
      case 'ADD_TO_FAVORITE':
        return {
          ...state,
          searchHistory: [...state.searchHistory, action.payload]
        }

      case 'REMOVE_FROM_FAVORITE':
        return {
          ...state,
          searchHistory: [
            ...state.searchHistory.filter((favorite) => { return favorite !== action.payload })
          ]
        }

      default:
        return state
    }
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const handleFavorite = (favorite) => {
    dispatch({
      type: isCharacter(favorite)
        ? 'REMOVE_FROM_FAVORITE'
        : 'ADD_TO_FAVORITE',
      payload: favorite
    })
  }
  useEffect(() => {
    const localTodos = localStorage.getItem('search')
    if (localTodos) {
      setTodos(JSON.parse(localTodos))
    }
  }, [setTodos])
  const addTodos = todo => {
    if (search.length >= 4) {
      search.pop()
      setTodos([...search, todo])
      search.unshift(todo)
    } else {
      setTodos([...search, todo])
    }
  }
  const markComplete = item => { return setTodos(search.filter((_, i) => { return i !== item })) }
  useEffect(() => {
    localStorage.setItem('search', JSON.stringify(search))
  }, [search])
  const isCharacter = (favorite) => { return searchHistory.searchHistory.find((character) => { return character === favorite }) }
  const handleSearch = (elem, type, selected) => {
    const isCharacter = () => { return search.find((character) => { return character === values.search }) }
    const exi = isCharacter()
    ref.current.focus()
    if (elem) return location.push(`/buscar/${elem}/${type}`)
    if (!values.search || values.search === ' ') return
    if (!exi) {
      addTodos(values.search)
    }
    if (selected) {
      location.push(`/buscar/${values.search}/${type}`)
    }
  }
  // INITIAL REDUCER
  const [searchHistory, dispatch] = useReducer(favoriteReducer, initialState)

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory.searchHistory))
  }, [searchHistory])


  return (<ContentInputSearch>
    <button className='btn btn-primary' onClick={() => { return handleSearch(null, 'TODO', true) }}>
      <IconSearch color={PColor} size='20px' />
    </button>
    <Input
      aria-label='Busca por platillo o restaurante'
      name='search'
      onChange={(e) => { return handleChange(e) }}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          handleSearch(null, 'TODO', true)
          e.target.blur()
        }
      }}
      placeholder='Buscar platillo o restaurante'
      ref={ref}
      role='search'
      tabIndex={'0'}
      type='text'
      value={''}
    />
    {/* https://codesandbox.io/s/persist-localstorage-with-usereducer-forked-j5wbgi */}
    <SearchTarget values={values?.search?.length}>
      {false && values?.search?.length > 0
        ? <div>
          <button onClick={() => { return handleSearch(null, 'PLATOS', true) }}>
            <IconShopping color={PColor} size='25px' />
            <span>{values.search} Platos</span>
          </button>
          <button onClick={() => { return handleSearch(null, 'RESTAURANT', true) }}>
            <IconShopping color={PColor} size='25px' />
            <span>{values.search} Restaurantes</span>
          </button>
          <button onClick={() => { return handleSearch(null, 'TODO', true) }}>
            <IconSearch color={PColor} size='25px' />
            <span>{values.search} todo en Delivery</span>
          </button>
        </div>
        : search.length >= 1
          ? <>
            {<div className='recent'>
              <span className='recent-span'>Búsquedas recientes</span>
              {search?.map((todo, i) => {
                return (
                  <div className='item-recent' key={i}>
                    <span
                      className='recent-span'
                      key={i + 1}
                      onClick={() => { return handleSearch(todo, 'TODO') }}
                    >{todo}</span>
                    <Button onClick={() => { return markComplete(i) }}><IconCancel size='15px' /></Button>
                  </div>
                )
              })}
            </div>}
          </>
          : null}
    </SearchTarget>
  </ContentInputSearch>)
}
