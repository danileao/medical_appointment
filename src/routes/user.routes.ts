import { Router } from 'express'
import { authenticateUserController } from '../modules/users/useCases/authenticate-user'
import { createUserController } from '../modules/users/useCases/create-user'
import { refreshTokenController } from '../modules/users/useCases/refresh-token'

const userRouter = Router()

userRouter.post('/login', async (request, response) => {
  await authenticateUserController.handle(request, response)
})

userRouter.post('/users', async (request, response) => {
  await createUserController.handle(request, response)
})

userRouter.post('/refresh-token', async (request, response) => {
  await refreshTokenController.handle(request, response)
})

export { userRouter }
