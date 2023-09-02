import { withIronSessionApiRoute } from 'iron-session/next'
import { newRegisterUser } from '../lib/resolvers/users/user'

export const MAX_AGE = 60 * 60 * 8

export default withIronSessionApiRoute(
  async function loginRoute (req, res) {
    // get user from database then:
    try {
      const { name, username, lastName, email, password, deviceid } = req.body
      const { token, message, success, roles, storeUserId } = await newRegisterUser(null, { name, username, lastName, email, password })
      if (success) {
        req.session.user = {
          isLoggedIn: true,
          roles,
          token,
          deviceid,
          storeUserId
        }
        await req.session.save()
        res.send({ ok: true, success, message, storeUserId, token })
      }
    } catch (error) {
      const { response: fetchResponse } = error
      res.status(fetchResponse?.status || 500).json(error.data)
    }
  },
  {
    password: process.env.SESSION_KEY,
    cookieName: process.env.SESSION_NAME,
    cookieOptions: {
      expires: new Date(Date.now() + MAX_AGE * 1000),
      maxAge: MAX_AGE, // 8 hours,
      secure: false
    }
  }
)
