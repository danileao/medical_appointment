import { Router } from 'express'
import { ensureAuthenticate } from '../infra/shared/http/middleware/ensure-authenticate.middleware'
import { createDoctorInfoController } from '../modules/doctor/useCases/create-doctor-info'

const doctorInfoRouter = Router()

doctorInfoRouter.post(
  '/doctor-info',
  ensureAuthenticate,
  async (request, response) => {
    await createDoctorInfoController.handle(request, response)
  }
)

export { doctorInfoRouter }
