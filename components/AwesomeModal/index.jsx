import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { Container, Wrapper, Modal, ModalHeader, ModalTitle, BtnClose, ModalBody, ModalFooter, BtnCancel, BtnConfirm } from './styled'
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
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  size: PropTypes.string,
  disabled: PropTypes.bool,
  display: PropTypes.string || PropTypes.bool,
  zIndex: PropTypes.string,
  padding: PropTypes.string,
  backdrop: PropTypes.string,
  useScroll: PropTypes.func,
  keyboard: PropTypes.func,
  footer: PropTypes.bool,
  btnCancel: PropTypes.bool,
  openLateral: PropTypes.bool || PropTypes.func,
  btnConfirm: PropTypes.bool,
  hideOnConfirm: PropTypes.func,
  timeOut: PropTypes.func || PropTypes.number,
  height: PropTypes.string || PropTypes.number,
  submit: PropTypes.func,
  header: PropTypes.bool,
  closeIcon: PropTypes.object,
  borderRadius: PropTypes.string,
  onHide: PropTypes.func || PropTypes.bool,
  onCancel: PropTypes.func || PropTypes.bool,
  onConfirm: PropTypes.func || PropTypes.bool

}
