/* eslint-disable consistent-return */
import React, {
  useState,
  useEffect,
  useCallback
} from 'react'
import PropTypes from 'prop-types'
import {
  Container,
  Wrapper,
  Modal,
  ModalHeader,
  ModalTitle,
  BtnClose,
  ModalBody,
  ModalFooter,
  BtnCancel,
  BtnConfirm
} from './styled'
import { MODAL_SIZES, BUTTONS_TEXT } from './constanst'
import { IconCancel } from '../../public/icons'
import { BGColor } from '../../public/colors'

export const AwesomeModal = ({
  title,
  size = MODAL_SIZES.medium,
  show,
  disabled,
  display,
  zIndex,
  padding,
  backdrop = true,
  useScroll = false,
  keyboard = true,
  footer = true,
  btnCancel = true,
  openLateral,
  btnConfirm = true,
  children,
  hideOnConfirm = true,
  timeOut = 200,
  height,
  submit = false,
  header = true,
  closeIcon = false,
  borderRadius = '.3rem',
  onHide = () => { return undefined },
  onCancel = () => { return undefined },
  onConfirm = () => { return undefined }
}) => {
  const [state, setState] = useState(show)
  const hide = useCallback(() => {
    setState(false)
    onCancel()
    setTimeout(onHide, timeOut)
  }, [onCancel, onHide, timeOut])
  useEffect(() => {
    if (backdrop !== 'static') {
      if (keyboard && show) window.addEventListener('keyup', e => { return e.code === 'Escape' && hide() })
      return () => { return keyboard && window.removeEventListener('keyup', () => { }) }
    }
  }, [keyboard, hide, show, backdrop])
  useEffect(() => {
    setState(show)
  }, [show])
  const onBackdropHide = e => {
    e.preventDefault()
    if (backdrop === 'static') return 0
    hide()
  }
  useEffect(() => {
    if (show && useScroll) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [show, useScroll])
  const clickCancel = () => {
    hide()
    onCancel()
  }
  const clickConfirm = () => {
    if (hideOnConfirm) hide()
    onConfirm()
  }
  return (
    <Container
      onMouseDown={onBackdropHide}
      openLateral={openLateral}
      show={show}
      showLateral={show}
      state={state}
      zIndex={zIndex}
    >
      <Wrapper onMouseDown={onBackdropHide}>
        <Modal
          borderRadius={borderRadius}
          height={height}
          onMouseDown={e => { return e.stopPropagation() }}
          show={show}
          showLateral={show}
          size={size}
          state={state}
        >
          {header && <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <BtnClose onClick={hide}><IconCancel size='20px' /></BtnClose>
          </ModalHeader>}
          {(closeIcon && !header) && <BtnClose fixed onClick={hide}></BtnClose>}
          <ModalBody
            display={display}
            height={height}
            padding={padding}
          >
            {children}
          </ModalBody>
          {footer && <ModalFooter>
            {btnCancel && <BtnCancel
              bgColor={BGColor}
              border
              disabled={disabled}
              onClick={clickCancel}
              type='button'
            >{BUTTONS_TEXT.cancel}</BtnCancel>}
            {btnConfirm && <BtnConfirm
              border
              onClick={clickConfirm}
              type={submit ? 'submit' : 'button'}
            >{BUTTONS_TEXT.confirm}</BtnConfirm>}
          </ModalFooter>}
        </Modal>
      </Wrapper>
    </Container>
  )
}

AwesomeModal.propTypes = {
  backdrop: PropTypes.string,
  borderRadius: PropTypes.string,
  btnCancel: PropTypes.bool,
  btnConfirm: PropTypes.bool,
  children: PropTypes.node.isRequired,
  closeIcon: PropTypes.object,
  disabled: PropTypes.bool,
  display: PropTypes.any,
  footer: PropTypes.bool,
  header: PropTypes.bool,
  height: PropTypes.any,
  hideOnConfirm: PropTypes.func,
  keyboard: PropTypes.func,
  onCancel: PropTypes.func,
  onConfirm: PropTypes.func,
  onHide: PropTypes.func,
  openLateral: PropTypes.any,
  padding: PropTypes.string,
  show: PropTypes.any,
  size: PropTypes.string,
  submit: PropTypes.func,
  timeOut: PropTypes.number,
  title: PropTypes.string,
  useScroll: PropTypes.func,
  zIndex: PropTypes.string
}
