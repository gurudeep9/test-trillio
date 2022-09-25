import Login from '../../container/entrar'

export default function LoginView () { return (<Login />) }

LoginView.getLayout = function getLayout (page) {
  return (
    <>
      {page}
    </>
  )
}

