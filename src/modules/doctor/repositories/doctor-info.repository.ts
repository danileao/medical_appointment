import { DoctorInfo } from '../entities/doctor-info.entity'

export interface IDoctorInfoRepository {
  saveOrUpdate(data: DoctorInfo): Promise<DoctorInfo>
}
