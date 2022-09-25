import { Email } from '../../../container/entrar/Email'

export default function EmailView () { return (<Email />) }

EmailView.getLayout = function getLayout (page) {
  return (
    <>
      {page}
    </>
  )
}


