/* eslint-disable camelcase */
import React, {
  useContext,
  useEffect,
  useState
} from 'react'
import { GET_USER, GET_USER_PROFILE } from './queries'
import { useQuery } from '@apollo/client'
import {
  Loading,
  InputHooks,
  RippleButton,
  LoadingButton
} from 'pkg-components'
import { validationSubmitHooks } from '../../utils'
import { Context } from '../../context'
import {
  Section,
  Container,
  Content,
  BoxInput,
  Title,
  ContainerAnimation,
  ContainerAnimationTow,
  Input,
  LabelInput,
  Paragraph
} from './styled'


export const Profile = () => {
  const { data, loading } = useQuery(GET_USER)
  const { data: dataUp } = useQuery(GET_USER_PROFILE)
  const { email } = data?.getUser || {}
  const { getOneUserProfile } = dataUp || {}

  const { setAlertBox } = useContext(Context)
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [active] = useState(1)

  const handleChange = (e, error) => {
    setValues({ ...values, [e.target.name]: e.target.value })
    setErrors({ ...errors, [e.target.name]: error })
  }
  const handleSavePass = async e => {
    e.preventDefault()
    // Declarando variables
    let errorSubmit = false
    for (const x in errors) {
      if (errors[x]) errorSubmit = true
    }
    // Validando todos los campos que no sean nulos
    const errorForm = validationSubmitHooks(e.target.elements)
    for (const x in errorForm) {
      if (errorForm[x]) errorSubmit = true
    }
    setErrors({ ...errorForm })
    try {
      if (!errorSubmit) {
        return
      }
    } catch (error) {
      setAlertBox({ message: `${error}` })
    }
  }

  useEffect(() => {
    const obj = { ...getOneUserProfile, ...data?.getUser }
    setValues({ ...obj })
  }, [data, getOneUserProfile, dataUp])
  const [emailFormat, setEmailFormat] = useState('')
  // eslint-disable-next-line no-unused-vars
  const [_, setlastEmailFormat] = useState('')
  useEffect(() => {
    if (email) {
      const email_regex = email
      const aa = email_regex?.split('@')
      const format = aa[0]
      const formatLength = format.length
      setEmailFormat(format)
      //
      const lastFormatted = format
      const last = lastFormatted.substring(formatLength - 4)
      setlastEmailFormat(last)
    }
  }, [data, email])

  return (
    <Section bg={emailFormat?.repeat(100)}>
      {/* // <Section bg={emailFormat?.repeat(8)} bg2={"inao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuv"} bg3={"sjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesusjuvinao jesu"}> */}
      <Container >
        <Content>
          {loading && <Loading />}
          <Title>Editar datos</Title>
          <Paragraph>Hola {`${email || 'Bienvenido'}`} </Paragraph>
          {/* <RippleButton padding='5px' widthButton='45%' onClick={() => active !== 1 && handleClick(1)}>1</RippleButton> */}
          {/* <RippleButton padding='5px' widthButton='45%' onClick={() => active !== 2 && handleClick(2)}>2</RippleButton> */}
          <form onSubmit={handleSavePass} >
            <React.Fragment> {active === 1
              ? <ContainerAnimation>
                <BoxInput>
                  <Input
                    name='name'
                    onChange={handleChange}
                    value={values.name}
                  />
                  <LabelInput >{'Nombre de usuario'}</LabelInput>
                </BoxInput>
                {<BoxInput>
                  <Input
                    name='upPhone'
                    onChange={handleChange}
                    value={values.upPhone}
                  />
                  <LabelInput >{'Teléfono'}</LabelInput>
                </BoxInput>
                }
              </ContainerAnimation>
              : active === 12212
                ? <ContainerAnimationTow>
                  <InputHooks
                    errors={errors.password}
                    name='password'
                    onChange={handleChange}
                    range={{ min: 0, max: 180 }}
                    required
                    title='Contraseña'
                    type='password'
                    value={values.password}
                  />
                </ContainerAnimationTow>
                : null}</React.Fragment>
            <RippleButton widthButton='100%'>
              {loading ? <LoadingButton color='#fff' /> : 'Confirmar'}
            </RippleButton>
          </form>
        </Content>
      </Container>
    </Section>
  )
}
