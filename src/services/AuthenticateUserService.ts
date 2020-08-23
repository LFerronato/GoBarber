import { getRepository } from 'typeorm'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'

import AppError from '../errors/AppError'

import User from '../models/User'
import authConfig from '../configs/auth'

interface Request {
  email: string
  password: string
}
interface Response {
  user: User
  token: string
}

class AuthenticateUserService {
  public async run({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User)
    const user = await userRepository.findOne({
      where: { email }
    })

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const ck = await compare(password, user.password)

    if (!ck) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn
    })

    return { user, token }
  }
}

export default AuthenticateUserService
