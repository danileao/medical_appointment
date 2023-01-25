import { Appointment } from '../entities/appointment.entity'

export type AppointmentsDate = {
  date: Date
}

export type AppointmentsWithPatient = {
  date: Date
  patient: {
    email: string
  }
}

export interface IAppointmentRepository {
  findAllSchedulesByDoctorAndDate(
    doctorId: string,
    date: string
  ): Promise<AppointmentsDate[]>

  findAppointmentByDoctorAndDatetime(
    doctorId: string,
    date: string
  ): Promise<AppointmentsDate | null>

  findAppointmentByPatientAndDatetime(
    patientId: string,
    date: string
  ): Promise<AppointmentsDate>

  save(data: Appointment): Promise<void>
  findAllTodayIncludePatients(): Promise<AppointmentsWithPatient[]>
}
