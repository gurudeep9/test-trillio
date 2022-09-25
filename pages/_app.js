import React from 'react'
import PropTypes from 'prop-types'
import { Layout as MainLayout } from '../components/Layout'
import Context from '../context'
import Auth from '../apollo/Auth'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../apollo/apolloClient'
import { GlobalStyle } from '../public/styles/GlobalStyle'
import '../public/styles/App.css'
import 'swiper/css'

import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import { API_GOOGLE_MAPS } from '@/apollo/urls'
import Script from 'next/script'

function MyApp ({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)
  const getLayout = Component.getLayout ?? ((page) => { return <MainLayout>{page}</MainLayout> })
  return (
    <Context>
      {/* https://developers.google.com/maps/documentation/javascript/places */}
      {/* https://github.com/wellyshen/use-places-autocomplete#load-the-library */}
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${API_GOOGLE_MAPS}&libraries=places`}
        strategy='beforeInteractive'
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
