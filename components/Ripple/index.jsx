import PropTypes from 'prop-types'
import React, { useRef, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { BGColor } from '../../public/colors'

export const RippleButton = props => {
  const {
    label,
    onClick,
    style,
    family,
    standard,
    active,
    type,
    widthButton,
    disabled
  } = props
  const button = useRef(null)

  useEffect(() => {
    let mounted = true
    const b = button.current
    b.addEventListener('click', e => {
      const rect = button.current.getBoundingClientRect()
      const ripple = document.createElement('div')
      const width = Math.max(rect.width, rect.height) * 2
      ripple.style.width = `${width}px`
      ripple.style.height = `${width}px`
      ripple.style.left = `${e.clientX - rect.left - width / 2}px`
      ripple.style.top = `${e.clientY - rect.top - width / 2}px`
      ripple.className = 'ripple'
      button.current.appendChild(ripple)

      setTimeout(() => { return mounted && button?.current?.removeChild(ripple) }, 1000)
    })

    return () => {
      mounted = false
    }
  }, [])

  return (
    <Button
      active={active}
      bgColor={ props.bgColor}
      border={props.border}
      className='ripple-button'
      color={ props.color }
      disabled={disabled}
      family={family}
      height={props.height}
      margin={ props.margin }
      onClick={onClick}
      padding={ props.padding }
      ref={button}
      size={props.size}
      standard={standard}
      style={style}
      type={type}
      widthButton={widthButton}
    >
      <span id='ripple-button-label'>{label}</span>
      {props.children}
    </Button>
  )
}

RippleButton.propTypes = {
  active: PropTypes.any,
  bgColor: PropTypes.any,
  border: PropTypes.any,
  children: PropTypes.any,
  color: PropTypes.any,
  disabled: PropTypes.any,
  family: PropTypes.any,
  height: PropTypes.any,
  label: PropTypes.any,
  margin: PropTypes.any,
  onClick: PropTypes.any,
  padding: PropTypes.any,
  size: PropTypes.any,
  standard: PropTypes.any,
  style: PropTypes.any,
  type: PropTypes.any,
  widthButton: PropTypes.any
}
const Button = styled.button`
 padding: ${({ padding }) => { return padding || '1em' }};
 border: ${({ border }) => { return border || 'none' }};
 background-color: ${({ bgColor }) => { return bgColor || 'red' }};
 color: ${({ color }) => { return color || BGColor }};
 font-family: ${({ family }) => { return family || 'PFont-Light' }};
 ${({ margin }) => { return !!margin && css`margin: ${margin};` }}
 ${({ height }) => { return !!height && css`height: ${height};` }}
 ${({ size }) => { return !!size && css`font-size: ${size};` }}
 ${({ standard }) => {
    return standard && css`
    display: flex;
    justify-content: space-between;
    background-color: transparent;
    color: #000;
    width: 100%;
    font-size: 11px !important;
    font-family: PFont-Light !important;`
  }
}
 ${({ widthButton }) => {
    return widthButton && css`
    width: ${widthButton};`
  }
}
${props => {
    return props.active && css`
    border-radius: 0;
border-bottom: 3px solid red; `
  }}

`
