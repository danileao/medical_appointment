import { Request, Response } from 'express'
import { IDoctorScheduleRepository } from '../../../doctor/repositories/doctor-schedule.repository'
import { IAppointmentRepository } from '../../repositories/appointment.repository'
import { FreeSchedulesUseCase } from './free-schedules.usecase'

export class FreeSchedulesController {
  constructor(
    private doctorScheduleRepository: IDoctorScheduleRepository,
    private appointmentRepository: IAppointmentRepository
  ) {}

  async handle(request: Request, response: Response) {
    const freeScheduleUseCase = new FreeSchedulesUseCase(
      this.doctorScheduleRepository,
      this.appointmentRepository
    )

    try {
      const result = await freeScheduleUseCase.execute(request.body)
      return response.json(result)
    } catch (err: any) {
      return response.status(err.statusCode ?? 500).json(err.message)
    }
  }
}
