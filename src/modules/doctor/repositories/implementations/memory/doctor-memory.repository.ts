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

  async findById(id: string): Promise<Doctor | null> {
    return this.items.find((doctor) => doctor.id === id) || null
  }
}
