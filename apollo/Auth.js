/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import React, {
  useEffect,
  Fragment,
  useState,
  useCallback,
  useContext
} from 'react'
import { getUserFromToken } from 'utils'
import { OUR_URL_BASE } from './urls'
import { useApolloClient } from '@apollo/client'
import { Context } from 'context'

export default function Auth ({ children }) {
  const { setSessionActive } = useContext(Context)
  const [token, setToken] = useState('')
  const [redirect, setRedirect] = useState(false)
  const { client } = useApolloClient()
  // eslint-disable-next-line
  const onClickLogout = useCallback(async () => {
    window.localStorage.removeItem('location.data')
    window.localStorage.removeItem('session')
    await window
      .fetch(`${OUR_URL_BASE}auth/logout/`, {})
      .then(res => {
        if (res) {
          client?.clearStore()
          location.replace('/')
        }
      })
      .catch(() => {
        return {}
      })
  }, [client])

  useEffect(() => {
    const session = window.localStorage.getItem('session')
    setSessionActive(!!session)
    setToken(session)
    const expiredSession = getUserFromToken(token)
    setRedirect(expiredSession)
    if (session && expiredSession === true) {
      // onClickLogout()
    }
  }, [token, redirect])

  return (
    <Fragment>
      {children}
    </Fragment>
  )
}

Auth.propTypes = {
  children: PropTypes.any
}
