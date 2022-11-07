import { Speciality } from '../../entities/speciality.entity'
import { ISpecialityRepository } from '../speciality.repository'

export class SpecialityMemoryRepository implements ISpecialityRepository {
  items: Speciality[] = []

  async save(data: Speciality): Promise<Speciality> {
    this.items.push(data)
    return data
  }
  async findByName(name: string): Promise<Speciality | null> {
    return this.items.find((speciality) => speciality.name === name) || null
  }
  async findById(id: string): Promise<Speciality | null> {
    return this.items.find((speciality) => speciality.id === id) || null
  }
}
