import { withIronSessionApiRoute } from 'iron-session/next'
import { cookie } from 'utils'

const logoutHandler = async (req, res) => {
  try {
    const { user } = req.session || {}
    const { isLoggedIn } = user || {}

    if (isLoggedIn === true) {
      // Destruye la sesión del usuario
      req.session.destroy()

      return res.status(200).json({
        status: 200,
        isLoggedIn: false,
        ok: true,
        user: null
      })
    }
    return res.status(200).json({
      message: 'No hay sesión activa'
    })
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.message,
      message: 'Lo sentimos, ha ocurrido un error interno al cerrar la sesión'
    })
  }
}

export default withIronSessionApiRoute(logoutHandler, cookie)
