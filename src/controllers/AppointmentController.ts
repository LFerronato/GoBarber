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
    try {
      const appointmentsRepository = getCustomRepository(AppointmentsRepository)
      const result = await appointmentsRepository.find()
      return resp.json(result)
    } catch (error) {
      return resp.status(400).json({ 'error': error.message })
    }
  }

  async create(req: Request, resp: Response) {
    try {
      const { provider_id, date } = req.body

      const parsedDate = parseISO(date)

      const createAppointment = new CreateAppointmentService()

      const appointment = await createAppointment.run({
        provider_id,
        'date': parsedDate,
      })
      return resp.status(201).json(appointment)
    } catch (error) {
      return resp.status(400).json({ 'error': error.message })
    }
  }
}

export default AppointmentsController
