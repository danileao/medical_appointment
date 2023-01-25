import cron from 'node-cron'
import { AppointmentPrismaRepository } from '../../modules/appointments/repositories/prisma/appointment.prisma.repository'
import { CreateNotificationAppointmentUseCase } from '../../modules/appointments/useCases/create-notification-appointmnet/create-notification-appointment.usecase'

cron.schedule('0 0 0 * * *', async () => {
  const appointmentRepository = new AppointmentPrismaRepository()
  const createNotificationAppointmentUseCase =
    new CreateNotificationAppointmentUseCase(appointmentRepository)
  await createNotificationAppointmentUseCase.execute()
})
