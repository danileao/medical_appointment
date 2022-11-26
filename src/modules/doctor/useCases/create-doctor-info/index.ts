import { DoctorInfoPrismaRepository } from '../../repositories/implementations/prisma/doctor-info.prisma.repository'
import { DoctorPrismaRepository } from '../../repositories/implementations/prisma/doctor.prisma.repository'
import { CreateDoctorInfoController } from './create-doctor-info.controller'

const doctorRepository = new DoctorPrismaRepository()
const doctorInfoRepository = new DoctorInfoPrismaRepository()

const createDoctorInfoController = new CreateDoctorInfoController(
  doctorRepository,
  doctorInfoRepository
)

export { createDoctorInfoController }
