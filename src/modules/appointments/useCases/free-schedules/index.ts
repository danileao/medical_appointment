import { DoctorSchedulePrismaRepository } from '../../../doctor/repositories/implementations/prisma/doctor-schedule.prisma.repository'
import { AppointmentPrismaRepository } from '../../repositories/prisma/appointment.prisma.repository'
import { FreeSchedulesController } from './free-schedules.controller'

const doctorSchedulePrismaRepository = new DoctorSchedulePrismaRepository()
const appointmentPrismaRepository = new AppointmentPrismaRepository()
const freeScheduleController = new FreeSchedulesController(
  doctorSchedulePrismaRepository,
  appointmentPrismaRepository
)

export { freeScheduleController }
