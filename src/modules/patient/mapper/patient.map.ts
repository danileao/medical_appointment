import { Patient } from '../entities/patient.entity'
import { Patient as PatientPrisma, User as UserPrisma } from '@prisma/client'
import { PatientWithUserDTO } from '../dto/patient.dto'

export class PatientMapper {
  static entityToPrisma = (patient: Patient): PatientPrisma => {
    return {
      document: patient.document,
      email: patient.email,
      id: patient.id,
      user_id: patient.userId,
    }
  }

  static prismaToEntity = (patient: PatientPrisma): Patient => {
    return {
      document: patient.document,
      email: patient.email,
      id: patient.id,
      userId: patient.user_id,
    }
  }
  static prismaToEntityIncludesUser = (
    patient: PatientPrisma & { user: UserPrisma }
  ): PatientWithUserDTO => {
    return {
      document: patient.document,
      email: patient.email,
      id: patient.id,
      userId: patient.user_id,
      user: {
        name: patient.user.name,
      },
    }
  }
}
