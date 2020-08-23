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

class appointmentsController {
  async index(req: Request, resp: Response) {
    try {
      console.log('antes')
      const appointmentsRepository = getCustomRepository(AppointmentsRepository)
      console.log('foi')
      const result = await appointmentsRepository.find()
      console.log(result)

      return resp.json(result) // link "all"
    } catch (error) {
      return resp.status(400).json({ 'error': error.message })
    }
  }

  async create(req: Request, resp: Response) {
    try {
      const { provider, date } = req.body

      const parsedDate = parseISO(date)

      const createAppointment = new CreateAppointmentService()

      const appointment = await createAppointment.run({
        provider,
        'date': parsedDate,
      })
      return resp.status(201).json(appointment)
    } catch (error) {
      return resp.status(400).json({ 'error': error.message })
    }
  }
}

export default appointmentsController
