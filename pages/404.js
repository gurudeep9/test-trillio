import PropTypes from 'prop-types'
import React from 'react'

const Error400 = ({ statusCode = null }) => {
  return <p>{`failed PAGINA NO ENCONTRADA ${statusCode || 404}`}</p>
}

Error400.propTypes = {
  statusCode: PropTypes.number
}

export default Error400
