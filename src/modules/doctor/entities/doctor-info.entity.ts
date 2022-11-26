import { CustomError } from '../../../errors/custom.error'
import { compareEndTimeIsAfter, validateTime } from '../../../utils/date'
import { generateUUID } from '../../../utils/generateUUID'

export type DoctorInfoProps = {
  duration: number
  price: number
  startAt: string
  endAt: string
  doctorId: string
}

export class DoctorInfo {
  id: string
  duration: number
  price: number
  startAt: string
  endAt: string
  doctorId: string

  private constructor(props: DoctorInfoProps) {
    if (!props.doctorId) {
      throw new CustomError('Doctor does not exists!')
    }

    if (props.duration <= 0) {
      throw new CustomError('Invalid duration!')
    }

    if (!validateTime(props.startAt)) {
      throw new CustomError('Invalid StartAt')
    }

    if (!validateTime(props.endAt)) {
      throw new CustomError('Invalid EndAt')
    }

    if (!compareEndTimeIsAfter(props.startAt, props.endAt)) {
      throw new CustomError('End time cannot be earlier than start time!')
    }

    this.id = generateUUID()
    this.duration = props.duration
    this.price = props.price
    this.startAt = props.startAt
    this.endAt = props.endAt
    this.doctorId = props.doctorId
  }

  static create(data: DoctorInfoProps) {
    const doctorInfo = new DoctorInfo(data)
    return doctorInfo
  }
}
