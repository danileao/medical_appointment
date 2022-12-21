import { DoctorWithUserDTO } from '../dto/doctor.dto'
import { Doctor } from '../entities/doctor.entity'

export interface IDoctorRepository {
  save(data: Doctor): Promise<Doctor>
  findByCRM(crm: string): Promise<Doctor | null>
  findById(id: string): Promise<DoctorWithUserDTO | null>
  findByUserID(userID: string): Promise<Doctor | null>
}
