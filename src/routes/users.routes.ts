import { Router } from 'express'
import multer from 'multer'
import uploadConfig from '../configs/upload'
const upload = multer(uploadConfig)

import UsersController from '../controllers/UsersController'
const usersController = new UsersController()

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const userRounter = Router()

userRounter
  .post('/', usersController.create)
  .patch('/', ensureAuthenticated, upload.single('avatarFile'), usersController.updateAvatar)

export default userRounter
