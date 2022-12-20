import { prismaClient } from '../../../../infra/databases/prisma.config'
import { Appointment } from '../../entities/appointment.entity'
import {
  AppointmentsDate,
  IAppointmentRepository,
} from '../appointment.repository'

export class AppointmentPrismaRepository implements IAppointmentRepository {
  async findAllSchedulesByDoctorAndDate(
    doctorId: string,
    date: string
  ): Promise<AppointmentsDate[]> {
    return await prismaClient.$queryRaw`
      SELECT ap.date from appointments ap  where to_char(ap.date, 'YYYY-MM-DD') = ${date} 
      and doctor_id = ${doctorId}
    `
  }

  async findAppointmentByDoctorAndDatetime(
    doctorId: string,
    date: string
  ): Promise<AppointmentsDate | null> {
    const result: AppointmentsDate[] = await prismaClient.$queryRaw`
    SELECT ap.date from appointments ap  where to_char(ap.date, 'YYYY-MM-DD HH24:MI') = ${date} 
    and doctor_id = ${doctorId} limit 1
  `
    return result[0]
  }
  async findAppointmentByPatientAndDatetime(
    patientId: string,
    date: string
  ): Promise<AppointmentsDate> {
    const result: AppointmentsDate[] = await prismaClient.$queryRaw`
    SELECT ap.date from appointments ap  where to_char(ap.date, 'YYYY-MM-DD HH24:MI') = ${date} 
    and patient_id = ${patientId} limit 1
  `
    return result[0]
  }

  async save(data: Appointment) {
    await prismaClient.appointment.create({
      data: {
        date: data.date,
        doctor_id: data.doctorId,
        patient_id: data.patientId,
        id: data.id,
      },
    })
  }
}
