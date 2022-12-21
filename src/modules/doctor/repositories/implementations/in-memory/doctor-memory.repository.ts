import { DoctorWithUserDTO } from './../../../../doctor/dto/doctor.dto'
import { Doctor } from '../../../entities/doctor.entity'
import { IDoctorRepository } from '../../doctor.repository'

export class DoctorMemoryRepository implements IDoctorRepository {
  items: Doctor[] = []

  async save(data: Doctor): Promise<Doctor> {
    this.items.push(data)
    return data
  }

  async findByCRM(crm: string): Promise<Doctor | null> {
    return this.items.find((doctor) => doctor.crm === crm) || null
  }

  async findById(id: string): Promise<DoctorWithUserDTO | null> {
    return (
      (this.items.find((doctor) => doctor.id === id) as DoctorWithUserDTO) ||
      null
    )
  }

  async findByUserID(userID: string): Promise<Doctor | null> {
    return this.items.find((doctor) => doctor.userId === userID) || null
  }
}
