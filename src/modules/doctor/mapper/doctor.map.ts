import { Doctor } from '../entities/doctor.entity'
import { Doctor as DoctorPrisma } from '@prisma/client'

export class DoctorMapper {
  static prismaToEntityDoctor = (data: DoctorPrisma): Doctor => {
    return {
      crm: data.crm,
      email: data.email,
      specialityId: data.speciality_id,
      userId: data.user_id,
      id: data.id,
    }
  }
}
