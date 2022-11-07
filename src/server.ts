import 'dotenv/config'
import express from 'express'
import { specialityRouter } from './routes/speciality.routes'
import { userRouter } from './routes/user.routes'

import swaggerUI from 'swagger-ui-express'

import swaggerDocument from '../swagger.json'
import { doctorRouter } from './routes/doctor.routes'

const app = express()

app.use(express.json())

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.use(userRouter)
app.use(specialityRouter)
app.use(doctorRouter)

app.listen(3000, () => console.log('Server is running on PORT 3000'))
