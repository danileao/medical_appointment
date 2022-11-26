import { CustomError } from '../../../errors/custom.error'
import { generateUUID } from '../../../utils/generateUUID'

export type PatientProps = {
  email: string
  document: string
  userId: string
}

export class Patient {
  email: string
  document: string
  userId: string
  id: string

  private constructor(props: PatientProps) {
    if (!props.email) {
      throw new CustomError('Email is required!')
    }

    if (!props.document || props.document.length <= 5) {
      throw new CustomError('Invalid Document')
    }

    this.userId = props.userId
    this.email = props.email
    this.document = props.document
    this.id = generateUUID()
  }

  static create(data: PatientProps) {
    const patient = new Patient(data)
    return patient
  }
}
