import React from 'react'

const Register = () => {
  return <p>{'regfister'}</p>
}

export default Register

Register.getLayout = function getLayout (page) {
  return (
    <>
      {page}
    </>
  )
}


