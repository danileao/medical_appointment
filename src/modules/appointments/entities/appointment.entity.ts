import { generateUUID } from '../../../utils/generateUUID'

type AppointmentProps = {
  patientId: string
  doctorId: string
  date: Date
}

export class Appointment {
  patientId: string
  doctorId: string
  id?: string
  date: Date
  note?: string
  isFinished?: boolean

  private constructor(props: AppointmentProps) {
    this.id = generateUUID()
    this.patientId = props.patientId
    this.doctorId = props.doctorId
    this.date = props.date
  }

  static create(data: AppointmentProps) {
    const appointmnet = new Appointment(data)
    return appointmnet
  }
}
