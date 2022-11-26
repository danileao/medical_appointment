import 'dotenv/config'
import express, { Request, Response } from 'express'
import { specialityRouter } from './routes/speciality.routes'
import { userRouter } from './routes/user.routes'

import swaggerUI from 'swagger-ui-express'

import swaggerDocument from '../swagger.json'
import { router } from './routes'

const app = express()

app.use(express.json())

app.use(router)

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(3000, () => console.log('Server is running on PORT 3000'))
