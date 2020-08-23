import { Router } from 'express'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'

import AppointmentsController from '../controllers/AppointmentController'
const appointmentsController = new AppointmentsController()

const appointmentsRounter = Router()
appointmentsRounter
  .use(ensureAuthenticated)
  .get('/', appointmentsController.index)
  .post('/', appointmentsController.create)

export default appointmentsRounter
