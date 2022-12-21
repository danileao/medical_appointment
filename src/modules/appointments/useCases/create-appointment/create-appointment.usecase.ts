import { CustomError } from '../../../../errors/custom.error'
import { IMailProvider } from '../../../../infra/providers/mail/mail.provider'
import {
  dateToString,
  formatDate,
  formatDateUTC,
  getDayOfWeek,
  toDate,
} from '../../../../utils/date'
import { IDoctorScheduleRepository } from '../../../doctor/repositories/doctor-schedule.repository'
import { IDoctorRepository } from '../../../doctor/repositories/doctor.repository'
import { IPatientRepository } from '../../../patient/repositories/patient.repository'
import { Appointment } from '../../entities/appointment.entity'
import { IAppointmentRepository } from '../../repositories/appointment.repository'

export type CreateAppointmentRequest = {
  doctorId: string
  date: Date
}

export class CreateAppointmentUseCase {
  constructor(
    private patientRepository: IPatientRepository,
    private doctorRepository: IDoctorRepository,
    private doctorScheduleRepository: IDoctorScheduleRepository,
    private appointmentRepository: IAppointmentRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: CreateAppointmentRequest, userId: string) {
    const patientExists = await this.patientRepository.findByUserId(userId)

    if (!patientExists) {
      throw new CustomError('Patient does not exists!')
    }

    const doctorExists = await this.doctorRepository.findById(data.doctorId)

    if (!doctorExists) {
      throw new CustomError('Doctor does not exists!')
    }

    const dayOfWeek = getDayOfWeek(dateToString(data.date))

    const doctorSchedule =
      await this.doctorScheduleRepository.findByDoctorIdAndDayOfWeek(
        data.doctorId,
        dayOfWeek
      )

    if (!doctorSchedule) {
      throw new CustomError('Doctor does not attend that day!')
    }

    const dateFormat = formatDateUTC(data.date, 'YYYY-MM-DD HH:mm')

    // Validar se horário está vazio
    const existAppointmentDoctor =
      await this.appointmentRepository.findAppointmentByDoctorAndDatetime(
        doctorExists.id,
        dateFormat
      )

    if (existAppointmentDoctor) {
      throw new CustomError('There is already an appointment for this time!')
    }

    // validar se o paciente não tem atendimento
    const existsAppointmentPatient =
      await this.appointmentRepository.findAppointmentByPatientAndDatetime(
        doctorExists.id,
        dateFormat
      )

    if (existsAppointmentPatient) {
      throw new CustomError('There is already an appointment for this patient!')
    }

    const appointment = Appointment.create({
      date: toDate(data.date),
      doctorId: doctorExists.id,
      patientId: patientExists.id,
    })
    // Salvar o agendamento
    await this.appointmentRepository.save(appointment)
    await this.mailProvider.sendMail({
      to: patientExists.email,
      from: 'Agendamento de Consulta <noreplay@agendamedico.com.br>',
      html: `
          Olá ${patientExists.user.name}! <br/>
          Gostaria de confirmar o <b>agendamento de consulta</b> para o dia ${formatDate(
            data.date,
            'DD/MM/YYYY'
          )}  as ${formatDate(data.date, 'HH:mm')}
          com o doutor <b>${doctorExists.user.name}</b>
      `,
      subject: 'Agendamento de consulta',
    })
  }
}
