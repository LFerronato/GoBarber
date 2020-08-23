import { Router } from 'express'

import AppointmentsController from '../controllers/AppointmentController'

const appointmentsController = new AppointmentsController()

const appointmentsRounter = Router()

appointmentsRounter
  .get('/', appointmentsController.index)
  .post('/', appointmentsController.create)

export default appointmentsRounter
