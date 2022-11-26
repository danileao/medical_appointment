import { UserPrismaRepository } from '../../../users/repositories/implementations/user.prisma.repository'
import { PatientPrismaRepository } from '../../repositories/prisma/patient.prisma.repository'
import { CreatePatientController } from './create-patient.controller'

const userRepository = new UserPrismaRepository()
const patientRepository = new PatientPrismaRepository()

const createPatientController = new CreatePatientController(
  userRepository,
  patientRepository
)

export { createPatientController }
