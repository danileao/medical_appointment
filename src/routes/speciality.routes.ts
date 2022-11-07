import { Router } from 'express'
import { ensureAdmin } from '../infra/shared/http/middleware/ensure-admin.middleware'
import { ensureAuthenticate } from '../infra/shared/http/middleware/ensure-authenticate.middleware'
import { createSpecialityController } from '../modules/speciality/useCases/create-speciality'

const specialityRouter = Router()

specialityRouter.post(
  '/specialities',
  ensureAuthenticate,
  ensureAdmin,
  async (request, response) => {
    await createSpecialityController.handle(request, response)
  }
)

export { specialityRouter }
