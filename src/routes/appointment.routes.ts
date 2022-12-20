import { Router } from 'express'
import { ensureAuthenticate } from '../infra/shared/http/middleware/ensure-authenticate.middleware'
import { createAppointmentController } from '../modules/appointments/useCases/create-appointment'
import { freeScheduleController } from '../modules/appointments/useCases/free-schedules'

const appointmentRoutes = Router()

appointmentRoutes.get('/appointments/free', async (request, response) => {
  await freeScheduleController.handle(request, response)
})

appointmentRoutes.post(
  '/appointments',
  ensureAuthenticate,
  async (request, response) => {
    await createAppointmentController.handle(request, response)
  }
)

export { appointmentRoutes }
