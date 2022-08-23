import { Router } from 'express'
import { createUserController } from '../modules/user/useCases/create-user'

const userRouter = Router()


userRouter.post('/users', (req, res) => createUserController.handle(req, res))

export { userRouter }
