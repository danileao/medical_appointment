import { CustomError } from '../../../errors/custom.error'
import { generateUUID } from '../../../utils/generate-uuid'

type DoctorInfoProps = {
  doctorId: string
  startAt: string
  endAt: string
  price: number
  duration: number
}

export class DoctorInfo {
  private doctorId: string
  private startAt: string
  private endAt: string
  private price: number
  private duration: number
  private _id: string

  get id() {
    return this._id
  }

  private constructor(props: DoctorInfoProps) {
    if (!props.doctorId) {
      throw new CustomError('Doctor id is required!')
    }

    if (!props.startAt || !props.endAt) {
      throw new CustomError('StartAt/EndAt are required!')
    }

    if (props.endAt <= props.startAt) {
      throw new CustomError('Invalid endAt!')
    }

    this.doctorId = props.doctorId
    this.startAt = props.startAt
    this.endAt = props.endAt
    this.price = props.price
    this.duration = props.duration
    this._id = generateUUID()
  }

  static create(props: DoctorInfoProps) {
    const doctorInfo = new DoctorInfo(props)

    return doctorInfo
  }
}
