import { gql } from '@apollo/client'

export const GET_MESSAGES = gql`
query getMessages($from: String!) {
  getMessages(from: $from) {
    uuid
    content
    from
    to
  }

}
`
export const SEND_MESSAGES = gql`
 mutation SendMessage($codeRoom: String!, $from: String!, $to: String!, $content: String!) {
    sendMessage(codeRoom: $codeRoom, from: $from, to: $to, content: $content) {
      uuid
      content
      aDatCre
      from
      to
    }
  }
`
export const NEW_MESSAGE = gql`
  subscription newMessage {
    newMessage {
      uuid
      from
      aDatCre
      to
      content
    }
  }
`
export const NEW_STORE = gql`
  subscription newStore {
    newStore {
      storeName,
      idStore,
    }
  }
`
