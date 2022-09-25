import PropTypes from 'prop-types'
import React from 'react'

const Error = ({ statusCode = null }) => {
  return <p>{`failed ${statusCode}`}</p>
}

Error.propTypes = {
  statusCode: PropTypes.any
}

export default Error
