import PropTypes from 'prop-types'
import React from 'react'
import { EmptyLayout } from './_app'

const Error = ({ statusCode = null }) => {
  return <p>{`failed  ERROR 500 ${statusCode}`}</p>
}

Error.propTypes = {
  statusCode: PropTypes.any
}

export default Error
Error.Layout = EmptyLayout
