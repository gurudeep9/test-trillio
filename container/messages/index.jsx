import { useMutation } from '@apollo/client'
import { MessageComp } from 'components/Messages'
import { ContainerContextMessage } from 'components/Messages/styled'
import { } from 'container/profile/queries'
import { SEND_MESSAGES } from 'gql/Messages'
import {
  useContext,
  useEffect,
  useState
} from 'react'
import { Context } from '../../context/index'
import {
  useStatusOrdersClient,
  useUser,
  useGetMessagesToRoom,
  chatRoomSubscription
} from 'npm-pkg-hook'
import { removeDuplicatesByIdStore } from './helpers'


export const Messages = () => {
  // ESTADOS
  const { setAlertBox, selectedStore, setStoreChatActive, hidden } = useContext(Context)
  const [messages, setMessages] = useState([])
  const [show, setShow] = useState(false)
  const [dataUser] = useUser()
  const { id } = dataUser || {}
  const [values, setValues] = useState({})

  const handleChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  // QUERIES
  const { data: storeOrder } = useStatusOrdersClient()

  const uniqueStoreOrders = removeDuplicatesByIdStore(storeOrder)

  const roomCode = Array.isArray(uniqueStoreOrders) ? uniqueStoreOrders[0]?.pCodeRef ?? '' : null

  const [sendMessage, { loading }] = useMutation(SEND_MESSAGES, {
    context: { clientName: 'web-socket-chat' }
  })

  const handleSendMessage = async e => {
    e.preventDefault()
    try {
      const { content } = values || {}
      if (selectedStore?.idStore && id && !!content) {
        await sendMessage({
          variables: {
            codeRoom: roomCode,
            from: id,
            to: selectedStore?.idStore ?? null,
            content
          }
        })
      }
      setValues({})
    } catch (error) {
      setAlertBox({
        message: 'Error al enviar mensaje',
        duration: 10000,
        color: 'warning'
      })
    }
  }
  const handleNewMessage = (message) => {
    setMessages((messages) => { return [...messages, message] })
  }
  const [dataM] = useGetMessagesToRoom(roomCode, id)

  useEffect(() => {
    setMessages(dataM)
  }, [dataM])

  chatRoomSubscription(roomCode, handleNewMessage)

  const [isOpen, setIsOpen] = useState(false)
  const handleOpenMessage = (x) => {
    setStoreChatActive(x)
    setIsOpen((state) => { return !state })
  }
  return (
    <ContainerContextMessage>
      <MessageComp
        data={uniqueStoreOrders || []}
        handleChange={handleChange}
        handleSendMessage={handleSendMessage}
        hidden={hidden}
        id={id}
        isOpen={isOpen}
        loading={loading}
        messages={messages}
        selectedStore={selectedStore}
        setIsOpen={setIsOpen}
        setShow={setShow}
        setStoreChatActive={handleOpenMessage}
        show={show}
        values={values}
      />
    </ContainerContextMessage>
  )
}
