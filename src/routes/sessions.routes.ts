import { Router } from 'express'
const sessionsRounter = Router()

import AuthenticateUserService from '../services/AuthenticateUserService'
const authenticateUserService = new AuthenticateUserService()

// pesquisar sobre: estratégias de refresh token
// https://jwt.io/
sessionsRounter
  .post('/', async (req, resp) => {
    try {
      const { email, password } = req.body

      const { user, token } = await authenticateUserService.run({ email, password })
      delete user.password
      return resp.json({ user, token })
    } catch (error) {
      return resp.status(400).json({ 'error': error.message })
    }
  })

export default sessionsRounter
