import { prismaClient } from '../../../../../infra/databases/prisma.config'
import { DoctorInfo } from '../../../entities/doctor-info.entity'
import { DoctorInfoMapper } from '../../../mapper/doctor-info.map'
import { IDoctorInfoRepository } from '../../doctor-info.repository'

export class DoctorInfoPrismaRepository implements IDoctorInfoRepository {
  async saveOrUpdate(data: DoctorInfo): Promise<DoctorInfo> {
    const doctor = await prismaClient.doctorInfo.upsert({
      where: { doctor_id: data.doctorId },
      create: {
        duration: data.duration,
        price: data.price,
        doctor_id: data.doctorId,
        id: data.id,
      },
      update: {
        duration: data.duration,
        price: data.price,
      },
    })
    return DoctorInfoMapper.prismaToEntityDoctorInfo(doctor)
  }
}
