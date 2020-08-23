import { Request, Response } from 'express'

import CreateUserService from '../services/CreateUserService'
const createUserService = new CreateUserService()

import UpdateUserAvatarService from '../services/UpdateUserAvatarService'
const updateUserAvatarService = new UpdateUserAvatarService()
/**
 * Receber Requisição
 * Direcionar
 * Responder
 */

class UsersController {
  async create(req: Request, resp: Response) {
    try {
      const { name, email, password } = req.body

      const user = await createUserService.run({ name, email, password })
      delete user.password
      return resp.json(user)
    } catch (error) {
      return resp.status(400).json({ 'error': error.message })
    }
  }
  async updateAvatar(req: Request, resp: Response) {
    const { user } = await updateUserAvatarService.run({
      userId: req.user.id,
      avatarFilename: req.file.filename,
    })

    delete user.password

    return resp.json(user)
  }
}

export default UsersController
