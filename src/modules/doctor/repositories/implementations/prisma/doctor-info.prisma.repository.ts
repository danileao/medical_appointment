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
        end_at: data.endAt,
        price: data.price,
        start_at: data.startAt,
        doctor_id: data.doctorId,
        id: data.id,
      },
      update: {
        duration: data.duration,
        end_at: data.endAt,
        price: data.price,
        start_at: data.startAt,
      },
    })
    return DoctorInfoMapper.prismaToEntityDoctorInfo(doctor)
  }
}
