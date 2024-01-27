import PropTypes from 'prop-types'
import { useContext, useEffect, useRef } from 'react'
import Image from 'next/image'
import {
  BoxChat,
  Chat,
  CircleStore,
  ContentAction,
  ContentMessage,
  ItemMessage,
  Message,
  TextMessage,
  WrapperChat
} from './styled'
import {
  DraggableContainer,
  InputHooks,
  PColor,
  RippleButton,
  Portal,
  IconMiniCheck,
  SECColor
} from 'pkg-components'
import { IconSendMessageTwo } from 'public/icons'
import { Context } from '../../context/index'

const scrollToBottom = (chatRef) => {
  if (chatRef.current) {
    chatRef.current.scrollTop = chatRef.current.scrollHeight
  }
}


export const MessageComp = ({
  data = [],
  id = null,
  messages,
  isOpen = false,
  values = {
    content: ''
  },
  handleSendMessage = (e) => { return e },
  handleChange = (e) => { return e },
  setStoreChatActive = (x) => { return x },
  setIsOpen = (x) => { return x }
}) => {
  const {
    selectedStore,
    hidden
  } = useContext(Context)
  const ref = useRef(null)
  const chatRef = useRef(null)

  // Hacer scroll hacia abajo cada vez que messages cambie
  useEffect(() => {
    scrollToBottom(chatRef)
  }, [messages])

  return (
    <div>
      <BoxChat className=''>
        {data.map((x, i) => {
          return <CircleStore key={x.pCodeRef} onClick={() => { return setStoreChatActive(x) }}>
            <ItemMessage > {x?.getOneStore?.storeName.slice(0, 2).toUpperCase()}</ItemMessage>
            <Image
              alt={''}
              blurDataURL='/images/DEFAULTBANNER.png'
              className='store_image'
              height={20}
              layout='responsive'
              objectFit='contain'
              src={'/images/b70f2f6c-8afc-4d75-bdeb-c515ab4b7bdd_BRITS_GER85.jpg'}
              width={20}
            />
          </CircleStore>
        })}
      </BoxChat>
      <Portal>
        <div style={{ zIndex: 99999, position: 'sticky' }}>
          <DraggableContainer
            isOpen={isOpen}
            modalRef={ref}
            onClose={() => { return setIsOpen(false) }}
            padding={0}
          >
            {selectedStore && <WrapperChat onSubmit={(e) => { return handleSendMessage(e) }} show={hidden}>
              <div className='alert-message'>
                  No compartas informacion personal, numeros cuentas de banco etc
              </div>
              <ContentAction>
                <Chat id='scroll' ref={chatRef}>
                  {messages?.length > 0 && messages?.map((x, i) => {
                    const date = x?.aDatCre ? new Date(parseInt(x?.aDatCre)) : ''
                    const HM = date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })
                    return (
                      <Message key={x.uuid}>
                        <ContentMessage messageUser={x.from} user={id}>
                          <TextMessage messageUser={x.from} user={id}>
                            {x.content} <span className='minute-hour'>{HM}</span> <IconMiniCheck color={`${SECColor}69`} size={10} />
                          </TextMessage>
                        </ContentMessage>
                      </Message>
                    )
                  })}

                </Chat>
                <div></div>
                <div className='header-chat'>
                  <InputHooks
                    autoComplete='off'
                    name='content'
                    onChange={handleChange}
                    padding='0'
                    paddingInput='20px'
                    placeholder='Aa'
                    radius='10px'
                    type='text'
                    value={values?.content}
                  />
                  <RippleButton
                    border='1px solid red'
                    padding='0 20px'
                    type='submit'
                    widthButton='10% '
                  >
                    <IconSendMessageTwo color={PColor} size='10px' />
                  </RippleButton>
                </div>
              </ContentAction>
            </WrapperChat>}

          </DraggableContainer>
        </div>
      </Portal>
    </div>
  )
}

MessageComp.propTypes = {
  data: PropTypes.shape({
    map: PropTypes.func
  }),
  handleChange: PropTypes.func,
  handleSendMessage: PropTypes.func,
  id: PropTypes.any,
  isOpen: PropTypes.bool,
  messages: PropTypes.shape({
    length: PropTypes.number,
    map: PropTypes.func
  }),
  setIsOpen: PropTypes.func,
  setStoreChatActive: PropTypes.func,
  values: PropTypes.shape({
    content: PropTypes.string
  })
}
