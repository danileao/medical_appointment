import { Router } from 'express'
import { appointmentRoutes } from './appointment.routes'
import { doctorInfoRouter } from './doctor-info.routes'
import { doctorScheduleRoutes } from './doctor-schedule.routes'
import { doctorRouter } from './doctor.routes'
import { patientRouter } from './patient.routes'
import { specialityRouter } from './speciality.routes'
import { userRouter } from './user.routes'

const router = Router()

router.use(userRouter)
router.use(specialityRouter)
router.use(doctorRouter)
router.use(doctorInfoRouter)
router.use(patientRouter)
router.use(doctorScheduleRoutes)
router.use(appointmentRoutes)

export { router }
