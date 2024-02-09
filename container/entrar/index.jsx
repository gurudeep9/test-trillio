import PropTypes from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'
import { ButtonSubmit, Content, Form, Card, Text } from './styled'
import { EColor, DarkSilver } from '../../public/colors'
import { fetchJson } from 'npm-pkg-hook'
import { useRouter } from 'next/router'
import { IconGoogleFullColor } from '../../public/icons'
import { Context } from '../../context'
import { getDeviceId } from '../../apollo/apolloClient'
import {
  ActiveLink,
  RippleButton,
  LoadingButton,
  GoogleLogin
} from 'pkg-components'

const Login = ({ watch, settings }) => {
  const router = useRouter()
  const { setAlertBox } = useContext(Context)
  const [location, setLocation] = useState({})
  const [locationFormat, setLocationFormat] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const data = window.localStorage.getItem('location')
    setLocation(JSON.parse(data))
  }, [])
  const { latitude, longitude } = location || {}

  const fetchData = async () => {
    const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${latitude} ${longitude}&key=AIzaSyDSp8cfGhQ1oykqVyVbIc1vWkURQTf4fzA`
    fetch(API)
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        setLocationFormat(response?.results)
      })
      .catch(() => {})
    return locationFormat ?? locationFormat[0].formatted_address
  }
  const responseGoogle = async (response) => {
    if (response && typeof response?.preventDefault === 'function') {
      response?.preventDefault()
    }
    setLoading(true)
    try {
      const { profileObj } = response || {}
      const { name, googleId, email, imageUrl } = profileObj || {}

      const locationResults = await fetchData(
        location?.latitude,
        location?.longitude
      )
      const device = await getDeviceId()
      const body = {
        name,
        username: name,
        lastName: name,
        email,
        password: googleId,
        locationFormat,
        useragent: window.navigator.userAgent,
        deviceid: device,
        imageUrl
      }
      const bodyDev = {
        name: 'Jesus Juvinao',
        username: 'Jesus Juvinao',
        lastName: 'Jesus Juvinao',
        email: 'juvinaojesusd@gmail.com',
        password: '103406429809408531217',
        useragent:
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
        deviceid: 'd30f7b61e48e517efc6932be15b5667f',
        imageUrl:
          'https://lh3.googleusercontent.com/a/AAcHTtc4b3_VC6v5u6-dqiiMsdra6dELCKa8GAurST5F3SxeVBo=s96-c'
      }

      try {
        const res = await fetchJson(`${process.env.URL_BACK_SERVER}/api/auth`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyDev),
          credentials: 'include'
        })

        const { userId, token, success } = res || {}
        if (success) {
          setAlertBox({ message: res.message, color: 'success' })
          window.localStorage.setItem('session', token)
          window.localStorage.setItem('usuario', userId)
          setAlertBox({ message: `${res.message}`, color: 'success' })
          router.push('/restaurantes')
        }
      } catch (error) {
        setAlertBox({
          message: 'Lo sentimos ha ocurrido un error',
          color: 'error'
        })
      } finally {
        setLoading(false)
      }
    } catch (error) {
      // console.log(error)
      // Handle error
    }
  }
  const isDev = process.env.NODE_ENV === 'development'
  return (
    <Content>
      <Card></Card>
      <Form>
        <Text size='30px'>¡Falta poco para saciar tu hambre!</Text>
        <Text size='15px'>¿Cómo deseas continuar?</Text>
        {isDev && (
          <button
            onClick={(e) => {
              return responseGoogle(e)
            }}
          >
            Login falso
          </button>
        )}
        <GoogleLogin
          autoLoad={false}
          clientId='58758655786-u323tp1dpi6broro865rrm488gh4mnpu.apps.googleusercontent.com'
          cookiePolicy={'single_host_origin'}
          onFailure={responseGoogle}
          onSuccess={responseGoogle}
          render={(renderProps) => {
            return (
              <ButtonSubmit
                color='2'
                colorFont={DarkSilver}
                disabled={renderProps.disabled}
                height='40px'
                onClick={renderProps.onClick}
                size='14px'
              >
                <IconGoogleFullColor size='30px' />{' '}
                {loading ? <LoadingButton /> : 'Continuar con Google'}
                <div style={{ width: 'min-content' }} />
              </ButtonSubmit>
            )
          }}
        />
        {isDev && (
          <ActiveLink activeClassName='active' href='/entrar/email'>
            <a>
              <RippleButton
                bgColor={EColor}
                margin='20px auto'
                type='button'
                widthButton='100%'
              >
                Correo
              </RippleButton>
            </a>
          </ActiveLink>
        )}
        <ActiveLink activeClassName='active' href='/register'>
          <a>
            <RippleButton
              bgColor={EColor}
              margin='20px auto'
              type='button'
              widthButton='100%'
            >
              Register
            </RippleButton>
          </a>
        </ActiveLink>
      </Form>
    </Content>
  )
}

Login.propTypes = {
  settings: PropTypes.any,
  watch: PropTypes.any
}

export default Login
