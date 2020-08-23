import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import AppError from '../errors/AppError'

import authConfig from '../configs/auth'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}
export default function ensureAuthenticated(
  req: Request,
  resp: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization
  if (!authHeader) {
    throw new AppError('JWT token is missing.', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    // decoded
    const { sub } = verify(token, authConfig.jwt.secret) as TokenPayload

    req.user = {
      id: sub
    }
    return next()
  } catch {
    throw new AppError('Invalid JWT token.')
  }
}
