import { formatDate } from '../../../utils/date'
import { EtherealMailProvider } from '../../providers/mail/implementations/ethereal.mail.provider'

export type NotificationTask = {
  email: string
  date: Date
}
const mailProvider = new EtherealMailProvider()

export async function notificationAppointmentWorker({
  email,
  date,
}: NotificationTask): Promise<void> {
  await mailProvider.sendMail({
    to: email,
    from: 'Agendamento de Consulta <noreplay@agendamedico.com.br>',
    html: `
      Olá ! <br/>
      Não se esqueça da sua consulta hoje as ${formatDate(date, 'HH:mm')}
  `,
    subject: 'Lembrete de agendamento de consulta',
  })
}
