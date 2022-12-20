import { DoctorInfo } from '../entities/doctor-info.entity'
import { DoctorInfo as DoctorInfoPrisma } from '@prisma/client'

export class DoctorInfoMapper {
  static prismaToEntityDoctorInfo = (data: DoctorInfoPrisma): DoctorInfo => {
    return {
      doctorId: data.doctor_id,
      id: data.id,
      duration: data.duration,
      price: Number(data.price),
    }
  }
}
