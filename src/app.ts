import 'dotenv/config'
import express from 'express'

import swaggerUI from 'swagger-ui-express'

import swaggerDocument from '../swagger.json'
import { router } from './routes'

import './infra/cron/notification-appointments-day.cron'

const app = express()

app.use(express.json())

app.use(router)

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

export { app }
