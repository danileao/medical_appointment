import { Doctor } from '../entities/doctor.entity'
import { Doctor as DoctorPrisma, User as UserPrisma } from '@prisma/client'
import { DoctorWithUserDTO } from '../dto/doctor.dto'

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

  static prismaToEntityDoctorWithUser = (
    data: DoctorPrisma & { user: UserPrisma }
  ): DoctorWithUserDTO => {
    return {
      crm: data.crm,
      email: data.email,
      specialityId: data.speciality_id,
      userId: data.user_id,
      id: data.id,
      user: {
        name: data.user.name,
      },
    }
  }
}
