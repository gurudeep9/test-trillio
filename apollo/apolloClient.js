/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable no-console */
import { useMemo } from 'react'
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloLink,
  split
} from '@apollo/client'
import { concatPagination, getMainDefinition } from '@apollo/client/utilities'
import merge from 'deepmerge'
import isEqual from 'lodash/isEqual'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import { WebSocketLink } from '@apollo/client/link/ws'
import { onError } from '@apollo/client/link/error'

import { URL_ADMIN, URL_ADMIN_SERVER, URL_BASE } from './urls'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__'

let apolloClient
export const getDeviceId = async () => {
  const fp = await FingerprintJS.load()
  const result = await fp.get()
  const { visitorId } = result || {}
  return visitorId
}
const authLink = async (_) => {
  if (typeof window !== 'undefined') {
    const token = window?.localStorage.getItem('session')

    const authorization = token ? `Bearer ${token}` : null
    return token
      ? {
        headers: {
          // ...headers,
          authorization
        }
      }
      : {
        headers: {
          // ...headers,
        }
      }
  }
  return ''
}

// Define la URL del servidor GraphQL
const graphqlUrl = process.env.URL_ADMIN_SERVER_SOCKET // Si estás en producción y usando WSS

// Comprueba si el código se está ejecutando en un navegador
const isBrowser = typeof window !== 'undefined'

// Crea el WebSocketLink solo si se está en un navegador
const wsLink = isBrowser
  ? new WebSocketLink({
    uri: `${graphqlUrl}/graphql`,
    options: {
      reconnect: true,
      lazy: true,
      connectionParams: () => {
        return {
          headers: { Authorization: 'Bearer TOKEN' } // Agrega tus encabezados de autorización
        }
      }
    }
  })
  : null

const getLink = async (operation) => {
  // await splitLink({ query: operation.query })
  const headers = await authLink()
  const service = operation.getContext().clientName
  let uri = `${process.env.URL_BACK_SERVER}/graphql`
  if (service === 'main') uri = `${process.env.URL_BACK_SERVER}/graphql`
  if (service === 'admin-store') uri = `${process.env.URL_BACK_SERVER}/graphql`
  if (service === 'admin-server') uri = `${process.env.URL_ADMIN_SERVER_SOCKET_HTTPS}`
  const link = new HttpLink({
    uri,
    credentials: 'same-origin',
    authorization: '',
    ...headers
  })
  return link.request(operation)
}

/**
 * Creates an Apollo Client instance based on the current environment and operation type.
 *
 * @returns {ApolloClient} The configured Apollo Client instance.
 */
function createApolloClient () {
  const ssrMode = typeof window === 'undefined'

  /**
   * Returns the appropriate link based on the current environment and operation type.
   *
   * @param {Operation} operation - The operation being performed.
   * @returns {ApolloLink} The appropriate ApolloLink for the operation.
   */
  function getDynamicLink (operation) {
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, location, path }) => {
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`
          )
        })
      }

      if (networkError) {
        console.log(`[Network error]: ${networkError}`)
      }
    })

    if (ssrMode) {
      return ApolloLink.split(
        () => {
          return true
        },
        (operation) => {
          return getLink(operation)
        }
      )
    } else if (typeof window !== 'undefined') {
      return split(
        (operation) => {
          const definition = getMainDefinition(operation.query)
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          )
        },
        wsLink,
        ApolloLink.split(
          () => {
            return true
          },
          (operation) => {
            return getLink(operation)
          }
        ),
        errorLink
      )
    }
    return ApolloLink.split(
      () => {
        return true
      },
      (operation) => {
        return getLink(operation)
      }
    )
  }

  const link = getDynamicLink()

  return new ApolloClient({
    connectToDevTools: true,
    ssrMode,
    link,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination()
          }
        }
      }
    })
  })
}

export function initializeApollo (ctx, initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient()
  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract()

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray, sourceArray) => {
        return [
          ...sourceArray,
          ...destinationArray.filter((d) => {
            return sourceArray.every((s) => {
              return !isEqual(d, s)
            })
          })
        ]
      }
    })

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data)
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient

  return _apolloClient
}

export function addApolloState (client, pageProps) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
  }

  return pageProps
}

export function useApollo (pageProps) {
  const state = pageProps[APOLLO_STATE_PROP_NAME]
  const store = useMemo(() => {
    return initializeApollo(state, pageProps)
  }, [state])
  return store
}
