import { ApolloProvider } from '@apollo/client'
import PropTypes from 'prop-types'
import { useApollo } from '../apollo/apolloClient'
import Auth from '../apollo/Auth'
import { Layout as MainLayout } from '../components/Layout'
import Context from '../context'
import { GlobalStyle } from '../public/styles/GlobalStyle'
import Script from 'next/script'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import '../public/styles/App.css'

function MyApp ({ Component, pageProps }) {
  const router = useRouter()

  const apolloClient = useApollo(pageProps)
  const getLayout = Component.getLayout ?? ((page) => { return <MainLayout>{page}</MainLayout> })
  useEffect(() => {
    const handleRouteChange = () => {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 300)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    // Remover el listener del evento al desmontar el componente
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <Context>
      {/* https://developers.google.com/maps/documentation/javascript/places */}
      {/* https://github.com/wellyshen/use-places-autocomplete#load-the-library */}
      <Script
        async
        defer
        id='google-map-script'
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY_GOOGLE_MAPS}&libraries=places`}
      />
      <GlobalStyle />
      <ApolloProvider client={apolloClient}>
        <Auth>
          {getLayout(
            <Component {...{ ...pageProps, isMobile: false }} />
          )}
        </Auth>
      </ApolloProvider>
    </Context >
  )
}

MyApp.propTypes = {
  Component: PropTypes.shape({
    getLayout: PropTypes.func
  }),
  pageProps: PropTypes.any
}

export default MyApp

export const EmptyLayout = ({ children }) => { return <div>{children}</div> }

EmptyLayout.propTypes = {
  children: PropTypes.node.isRequired
}
