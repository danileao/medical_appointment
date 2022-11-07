import { randomUUID } from 'crypto'

type ISpeciality = {
  name: string
  description: string
}

export class Speciality {
  id: string
  name: string
  description: string
  createdAt: Date

  constructor({ name, description }: ISpeciality) {
    this.name = name
    this.description = description
    this.createdAt = new Date()
    this.id = randomUUID()
  }

  static create(props: ISpeciality) {
    if (!props.name) {
      throw new Error('Speciality name is required!')
    }

    const speciality = new Speciality(props)
    return speciality
  }
}
