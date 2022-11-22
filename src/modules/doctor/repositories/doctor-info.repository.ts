import { DoctorInfo } from '../entities/doctor-info.entity'

export interface IDoctorInfoRepository {
  save(data: DoctorInfo): Promise<DoctorInfo>
}
