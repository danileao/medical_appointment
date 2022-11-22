import { CustomError } from '../../../../errors/custom.error'
import { DoctorInfo } from '../../entities/doctor-info.entity'
import { IDoctorInfoRepository } from '../../repositories/doctor-info.repository'
import { IDoctorRepository } from '../../repositories/doctor.repository'

export type DoctorInfoRequest = {
  doctorId: string
  startAt: string
  endAt: string
  price: number
  duration: number
}

export class CreateDoctorInfoUseCase {
  constructor(
    private doctorRepository: IDoctorRepository,
    private doctorInfoRepository: IDoctorInfoRepository
  ) {}
  async execute(data: DoctorInfoRequest) {
    const doctorInfo = DoctorInfo.create(data)

    const existDoctor = await this.doctorRepository.findById(data.doctorId)

    if (!existDoctor) {
      throw new CustomError('Doctor does not exists!')
    }

    const doctorInfoCreated = await this.doctorInfoRepository.save(doctorInfo)

    return doctorInfoCreated
  }
}
