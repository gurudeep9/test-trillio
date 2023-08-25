/* eslint-disable */
const withPlugins = require('./scripts/next-compose-plugins/lib')
const withTM = require('next-transpile-modules')([
  'pkg-components',
  'npm-pkg-hook'
]) // pass the modules you would like to see transpiled

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: process.env.NODE_ENV === 'development'
})

/** @type {import('next').NextConfig} */
module.exports = async (phase) => {
  const env = {
    NAMEDB: process.env.NAMEDB,
    USERDB: process.env.USERDB,
    PASSDB: process.env.PASSDB,
    HOST_DB: process.env.HOST_DB,
    BUSSINESS_TITLE: process.env.BUSSINESS_TITLE,
    MYSQL_PORT: process.env.MYSQL_PORT,
    DIALECTDB: process.env.DIALECTDB,
    LOCAL_SALES_STORE: process.env.LOCAL_SALES_STORE,
    SESSION_NAME: process.env.SESSION_NAME,
    SESSION_KEY: process.env.SESSION_KEY,
    URL_BASE:process.env.URL_BASE,
    MAIN_URL_BASE: process.env.MAIN_URL_BASE,
    URL_ADMIN_SERVER: process.env.URL_ADMIN_SERVER,
    JWT_EXPIRY: process.env.JWT_EXPIRY,
    REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY,
    AUTHO_USER_KEY: process.env.AUTHO_USER_KEY,
    REACT_APP_API_KEY_GOOGLE_MAPS: process.env.REACT_APP_API_KEY_GOOGLE_MAPS,
    ACCESS_SID_TWILIO: process.env.ACCESS_SID_TWILIO,
    ACCESS_TOKEN_AUTH_TWILIO: process.env.ACCESS_TOKEN_AUTH_TWILIO,
    SECRET_KEY: process.env.SECRET_KEY
  }

  const images = {
    domains: [
      'http2.mlstatic.com',
      'localhost',
      'server-image-food.herokuapp.com',
      '*'
    ]
  }

  const headers = async () => {
    return [
      {
        source: '/',
        headers: [
          {
            key: 'x-custom-header-1',
            value: 'my custom header 1'
          }
        ]
      }
    ]
  }

  const nextConfig = {
    env,
    images,
    reactStrictMode: true,
    headers,
    optimizeFonts: true,
    swcMinify: false,
    webpack: (config, { isServer }) => {
      config.resolve.alias = {
        ...config.resolve.alias,
        // Will make webpack look for these modules in parent directories
        'pkg-components': require.resolve('pkg-components')
      }
      return config
    }
  }

  const defaultConfig = nextConfig

  return withPlugins( [withTM], [withPWA], nextConfig)(phase, { defaultConfig })
}