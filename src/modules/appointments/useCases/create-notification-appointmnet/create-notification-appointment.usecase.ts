import { IMailProvider } from '../../../../infra/providers/mail/mail.provider'
import { queueAppointmentNotification } from '../../../../infra/queue/notification-appointment/notification-appointment.queue'
import { formatDate } from '../../../../utils/date'
import { IAppointmentRepository } from '../../repositories/appointment.repository'

export class CreateNotificationAppointmentUseCase {
  /*
    Listar todos os agendamentos do dia
    Enviar e-mail para os pacientes com a informação do horário de atendimento
  */
  constructor(private appointmentRepository: IAppointmentRepository) {}

  async execute() {
    const appointmnets =
      await this.appointmentRepository.findAllTodayIncludePatients()

    appointmnets.forEach(async (appointment) => {
      const emailPatient = appointment.patient.email
      const date = appointment.date

      await queueAppointmentNotification.push({
        email: emailPatient,
        date: date,
      })
    })

    return appointmnets
  }
}
