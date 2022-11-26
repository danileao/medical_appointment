import { Patient } from '../entities/patient.entity'
import { Patient as PatientPrisma } from '@prisma/client'

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
}
