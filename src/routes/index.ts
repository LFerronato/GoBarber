import { Router } from 'express'

import appointmentsRounter from './appointments.routes'
import usersRounter from './users.routes'

// SoC: Separation of Concerns (Separação de Preocupações)

const app = Router()

app.use('/appointments', appointmentsRounter).use('/users', usersRounter)

export default app
