import React, {
  useState,
  useContext,
  useEffect
} from 'react'
import { EColor, PLColor } from 'public/colors'
import {
  RippleButton,
  InputHooks,
  Text
} from 'pkg-components'
import { useFormTools, fetchJson } from 'npm-pkg-hook'
import { IconArrowLeft } from 'public/icons'
import { getDeviceId } from 'apollo/apolloClient'
import { useRouter } from 'next/router'
import { decodeToken } from 'utils'
import Link from 'next/link'
import { Context } from 'context'

import { URL_BASE } from '../../apollo/urls'
import {
  Content,
  Form,
  Card,
  GoBack
} from './styled'

export const RegisterUser = () => {
  const router = useRouter()
  const { setAlertBox } = useContext(Context)
  const [handleChange, handleSubmit, setDataValue, { dataForm, errorForm }] = useFormTools()
  const [email, setEmail] = useState('')

  const handleForm = (e) => {
    handleSubmit({
      event: e,
      action: async () => {
        const device = await getDeviceId()
        const body = {
          name: dataForm?.email,
          username: dataForm.email,
          lastName: dataForm.email,
          email: dataForm.email,
          password: dataForm.pass,
          locationFormat: '',
          useragent: window.navigator.userAgent,
          deviceid: device
        }
        return fetchJson(`${URL_BASE}auth`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        }).then(res => {
          if (res.success) {
            setAlertBox({ message: `${res.message}`, color: 'success' })
            const decode = decodeToken(res?.token)
            localStorage.setItem('userlogin', JSON.stringify(decode))
            if (res?.storeUserId) {
              const { idStore, id } = res.storeUserId
              localStorage.setItem('restaurant', idStore)
              localStorage.setItem('usuario', id)
              localStorage.setItem('session', res.token)
              router.push('/restaurante/getDataVerify')
            } else {
              router.push('/restaurante/getDataVerify')
            }
          }
        })
      },
      actionAfterSuccess: () => {
        setDataValue({})
      }
    })
  }
  useEffect(() => {
    const dataLocalStorage = localStorage.getItem('userlogin')
    const dataUser = JSON.parse(dataLocalStorage) || {}
    setEmail(dataUser.username)
  }, [email])

  return (
    <Content>
      <Card />
      <Form onSubmit={handleForm}>
        <div style={{ display: 'flex' }}>
          <GoBack onClick={() => { return router.back() }}>
            <IconArrowLeft color={`${PLColor}`} size='25px' />
          </GoBack>
          <Text align='center' as='h2'>¡Ingresa tus datos para registrarte!</Text>
        </div>
        <InputHooks
          error={errorForm?.email}
          name='email'
          onChange={handleChange}
          required
          title='Ingresa tu correo.'
          value={dataForm?.email}
          width='100%'
        />
        <InputHooks
          error={errorForm?.pass}
          name='pass'
          onChange={handleChange}
          required
          title='Ingresa tu Contraseña.'
          type='password'
          value={dataForm?.pass}
          width='100%'
        />
        <RippleButton
          bgColor={EColor}
          margin='20px auto'
          type='submit'
          widthButton='100%'
        >
          Continuar
        </RippleButton>
        <Link href='/entrar/email'>
          <Text align='center' style={{ cursor: 'pointer' }}>¿Olvidaste la contraseña? Ingresa aqui</Text>
        </Link>
      </Form>
    </Content>
  )
}
