import PropTypes from 'prop-types'
import React from 'react'

export const Entrar = ({ name }) => {
  return <div>
    {name}
  </div>
}

Entrar.propTypes = {
  name: PropTypes.string.isRequired
}
