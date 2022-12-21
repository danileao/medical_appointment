import { prisma } from '@prisma/client'
import { prismaClient } from '../../../../../infra/databases/prisma.config'
import { DoctorWithUserDTO } from '../../../dto/doctor.dto'
import { Doctor } from '../../../entities/doctor.entity'
import { DoctorMapper } from '../../../mapper/doctor.map'
import { IDoctorRepository } from '../../doctor.repository'

export class DoctorPrismaRepository implements IDoctorRepository {
  async save(data: Doctor): Promise<Doctor> {
    const doctor = await prismaClient.doctor.create({
      data: {
        crm: data.crm,
        email: data.email,
        speciality_id: data.specialityId,
        user_id: data.userId,
      },
    })
    return DoctorMapper.prismaToEntityDoctor(doctor)
  }
  async findByCRM(crm: string): Promise<Doctor | null> {
    const doctor = await prismaClient.doctor.findUnique({
      where: {
        crm,
      },
    })
    if (doctor) return DoctorMapper.prismaToEntityDoctor(doctor)
    return null
  }

  async findById(id: string): Promise<DoctorWithUserDTO | null> {
    const doctor = await prismaClient.doctor.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    })
    if (doctor) return DoctorMapper.prismaToEntityDoctorWithUser(doctor)
    return null
  }

  async findByUserID(userID: string): Promise<Doctor | null> {
    const doctor = await prismaClient.doctor.findUnique({
      where: {
        user_id: userID,
      },
    })
    if (doctor) return DoctorMapper.prismaToEntityDoctor(doctor)
    return null
  }
}
