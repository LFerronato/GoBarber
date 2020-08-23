import 'reflect-metadata'

import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import routes from './routes'

import AppError from './errors/AppError'
import uploadConfig from './configs/upload'

import './database'

const app = express()
app.use(express.json())

app.use('/files', express.static(uploadConfig.directory)) // tem que ser GET mesmo

app.use(routes)

app.use((err: Error, req: Request, resp: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return resp.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }
  return resp.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
})

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!')
})
