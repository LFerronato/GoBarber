import 'reflect-metadata'

import express from 'express'
import routes from './routes'

import uploadConfig from './configs/upload'

import './database'

const app = express()
app.use(express.json())
app.use('/files', express.static(uploadConfig.directory)) // tem que ser GET mesmo
app.use(routes)

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!')
})
