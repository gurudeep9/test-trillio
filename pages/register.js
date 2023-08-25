import { RegisterUser } from '@/container/Register'

export default function RegisterView () {
  return <RegisterUser />
}

RegisterView.getLayout = (page) => {
  return (
    <>
      {page}
    </>
  )
}
