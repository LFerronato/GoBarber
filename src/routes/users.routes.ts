import { Router } from 'express'

const userRounter = Router()

userRounter
  .get('/', (req, resp) => {
    resp.send('Foi!')
  })

export default userRounter