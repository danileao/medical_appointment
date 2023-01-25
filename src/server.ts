import 'dotenv/config'
import express, { Request, Response } from 'express'
import { specialityRouter } from './routes/speciality.routes'
import { userRouter } from './routes/user.routes'

import swaggerUI from 'swagger-ui-express'

import swaggerDocument from '../swagger.json'
import { router } from './routes'

import './infra/cron/notification-appointments-day.cron'

const app = express()

const port = process.env.port || 3000

app.use(express.json())

app.use(router)

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(port, () => console.log(`Server is running on PORT ${port}`))
