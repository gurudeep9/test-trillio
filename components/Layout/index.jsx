import { useRouter } from 'next/router'
import { usePosition } from 'npm-pkg-hook'
import PropTypes from 'prop-types'
import { useContext, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { ModalProduct } from '../../components/ModalProducts'
import { Context } from '../../context'
import { AlertBox } from '../AlertBox'
import { AsideCheckout } from '../AsideCheckout'
import { Footer } from './footer'
import { FooterDesktop } from './FooterDesktop'
import { HeaderMain } from './headerlog'
import { NavHeaderMobile } from './NavHeaderMobile'

export const Layout = ({ children, watch, settings }) => {
  const location = useRouter()
  const {
    error,
    setAlertBox,
    handleMenu,
    menu,
    setOpenMenuMobile,
    menuMobile
  } = useContext(Context)
  useEffect(() => {
    setAlertBox({ message: '', color: 'success' })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const {
    latitude,
    longitude,
    timestamp,
    accuracy,
    speed,
    error: _err
  } = usePosition(watch, settings)
  // useEffect(() => {
  //   setAlertBox({ message: '', color: 'success' })
  //   if (latitude) {
  //     window.localStorage.setItem('latitude', latitude)
  //     window.localStorage.setItem('longitude', longitude)
  //     window.localStorage.setItem('location', JSON.stringify(dataLocation))
  //     if (_err) setAlertBox({ message: `Lo sentimo ocurrió un error en tu ubicación${_err}`, color: '' })
  //   }
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [latitude, longitude, timestamp, accuracy, speed])
  const val = !['/delivery/[location]/[name]/[id]'].find(x => { return x === location.pathname })
  return (
    <div>
      <AlertBox err={error} />
      <Main aside={!['/', '/login', '/entrar', '/restaurante', '/entrar/email', '/contact', '/varify-email', '/checkout/[id]', '/add-payment-method', '/register', '/terms_and_conditions', '/email/confirm/[code]', '/forgotpassword', '/teams/invite/[id]', '/autho', '/contact-us', '/switch-options'].find(x => { return x === location.pathname })} >
        <AsideCheckout handleMenu={handleMenu} menu={menu} />
        {<HeaderMain handleMenu={handleMenu} menu={menu} />}
        <div style={{ gridArea: 'main', overflowY: 'auto' }}>
          {<NavHeaderMobile menuMobile={menuMobile} setOpenMenuMobile={setOpenMenuMobile} />}
          {children}
          {val && <FooterDesktop />}
          <ModalProduct />
        </div>
        {!['/login', '/register', '/varify-email', '/restaurante', '/checkout/[id]', '/forgotpassword', '/terms_and_conditions', '/email/confirm/[code]', '/switch-options', '/teams/invite/[id]', '/contact'].find(x => { return x === location.pathname }) && <Footer />}
        <div style={{ gridArea: 'right' }}>
        </div>
      </Main>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.any,
  settings: PropTypes.any,
  watch: PropTypes.any
}

const Main = styled.main`
    display: grid;
    width: 100%;
    overflow: hidden;
    height: 100vh;
    grid-template-rows: 80px 2fr;
    grid-template-columns: min-content 1fr;
    grid-template-areas:
        'head head head head'
        'main main main right'
        'main main main right';
    text-align: center;
    grid-gap: 0;
    /* grid-gap: 10px; */
    @media (min-width: 960px) {
        ${props => {
    return !props.aside &&
        css`
                /* grid-template-columns: 1fr; */
                display: flex;
                flex-direction: column;
                height: 100%;
            `
  }};
    }
`
