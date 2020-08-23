import { Request, Response } from 'express'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import CreateAppointmentService from '../services/CreateAppointmentService'

import AppointmentsRepository from '../repositories/AppointmentsRepository'

/**
 * Receber Requisição
 * Direcionar
 * Responder
 */

class AppointmentsController {
  async index(req: Request, resp: Response) {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const result = await appointmentsRepository.find()

    return resp.json(result)
  }

  async create(req: Request, resp: Response) {
    const { provider_id, date } = req.body

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService()

    const appointment = await createAppointment.run({
      provider_id,
      'date': parsedDate,
    })

    return resp.status(201).json(appointment)
  }
}

export default AppointmentsController
