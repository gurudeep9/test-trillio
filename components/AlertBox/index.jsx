import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import {
  ContainerText,
  ContainerToast,
  ContentToast
} from './styled'

export const AlertBox = ({ err }) => {
  const [closed, setClosed] = useState(false)

  useEffect(() => {
    if (err) {
      const timeOut = setTimeout(() => { return setClosed(true) }, (err.duration || 7000) / 2)
      return () => {
        clearTimeout(timeOut)
        setClosed(false)
      }
    }
    return {}
  }, [err])
  return (
    <React.Fragment>
      <ContainerToast
        closed={closed}
        color={err?.color}
        error={!!err?.message}
        onClick={setClosed}
      >
        <ContentToast>
          <ContainerText >{(err?.message || '')}</ContainerText>
          <div></div>
        </ContentToast>
      </ContainerToast>
    </React.Fragment>
  )
}

AlertBox.propTypes = {
  err: PropTypes.shape({
    color: PropTypes.any,
    duration: PropTypes.number,
    message: PropTypes.string
  })
}
