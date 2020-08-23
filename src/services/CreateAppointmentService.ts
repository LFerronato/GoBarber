import { startOfHour } from 'date-fns'
import { getCustomRepository } from 'typeorm'

import Appointment from '../models/Appointment'
import AppointmentsRepository from '../repositories/AppointmentsRepository'

// RequestDTO
interface Request {
  provider: string
  // eslint-disable-next-line prettier/prettier
  date: Date
}
/**
 * [x]Recebimento das informações
 * [x]Tratativa de erros/excessões
 * [x]Acesso ao repositório
 */

/**
 * Dependency Inversion: Quando tem varios services que usam mesmo componente
 */

class CreateAppointmentService {
  // execute or run
  public async run({ provider, date }: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmentsRepository
      .findByDate(
        appointmentDate
      )
    if (findAppointmentInSameDate) {
      throw Error('This datetime is busy!')
    }
    const appointment = appointmentsRepository.create({
      provider,
      "date": appointmentDate
    })
    await appointmentsRepository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService
