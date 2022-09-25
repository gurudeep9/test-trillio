import withSession from '../../../apollo/session'

export default withSession(async (req, res) => {
  if (req.session) {
    req.session.destroy()
    res.json({ isLoggedIn: false })
    return res.end()
  }
  return res.status(200).json({ name: 'John Doe' })
})
