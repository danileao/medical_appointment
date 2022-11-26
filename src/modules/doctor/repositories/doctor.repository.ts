import { Doctor } from '../entities/doctor.entity'

export interface IDoctorRepository {
  save(data: Doctor): Promise<Doctor>
  findByCRM(crm: string): Promise<Doctor | null>
  findById(id: string): Promise<Doctor | null>
  findByUserID(userID: string): Promise<Doctor | null>
}
