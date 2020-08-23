import { getRepository } from "typeorm"

import path from 'path'
import uploadConfig from '../configs/upload'
import fs from 'fs'

import User from "../models/User"

interface Request {
  userId: string
  avatarFilename: string
}
class UpdateUserAvatarService {
  public async run({ userId, avatarFilename }: Request): Promise<{ user: User }> {
    const usersRespository = getRepository(User)

    const user = await usersRespository.findOne(userId)

    if (!user) throw new Error('Only authenticated users can change avatar.')

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExists) await fs.promises.unlink(userAvatarFilePath)

    }

    user.avatar = avatarFilename

    await usersRespository.save(user)

    return { user }
  }
}

export default UpdateUserAvatarService
