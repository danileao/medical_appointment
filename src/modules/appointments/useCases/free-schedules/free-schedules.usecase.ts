import dayjs from 'dayjs'
import { CustomError } from '../../../../errors/custom.error'
import { dateToString, formatDate, getDayOfWeek } from '../../../../utils/date'
import { IDoctorScheduleRepository } from '../../../doctor/repositories/doctor-schedule.repository'
import { IAppointmentRepository } from '../../repositories/appointment.repository'

type FreeScheduleRequest = {
  doctorId: string
  date: string
}

type FreeTime = {
  time: string
}

type FreeScheduleResponse = {
  doctorId: string
  freeTime: FreeTime[]
}

export class FreeSchedulesUseCase {
  constructor(
    private doctorScheduleRepository: IDoctorScheduleRepository,
    private appointmentRepository: IAppointmentRepository
  ) {}

  async execute(data: FreeScheduleRequest): Promise<FreeScheduleResponse> {
    if (!data.doctorId) {
      throw new CustomError('Doctor is required', 400)
    }

    if (!data.date) {
      throw new CustomError('You need to select a date', 400)
    }

    const dayOfWeek = getDayOfWeek(data.date)

    const doctorSchedule =
      await this.doctorScheduleRepository.findByDoctorIdAndDayOfWeek(
        data.doctorId,
        dayOfWeek
      )

    if (!doctorSchedule) {
      throw new CustomError('Doctor does not attend that day!')
    }

    const appointmentsByDoctorAndDate =
      await this.appointmentRepository.findAllSchedulesByDoctorAndDate(
        data.doctorId,
        data.date
      )

    // 09:00
    /** Duração - 30 minutos
     *
     * [] - 09:00
     *
     * [] - 10:00
     */

    // 18:00
    const startAt = doctorSchedule.startAt
    const endAt = doctorSchedule.endAt
    const duration = doctorSchedule.doctor.doctorInfo.duration

    let timeNow = startAt
    const freeTime: FreeTime[] = []

    while (timeNow <= endAt) {
      // 2022-12-18 09:00

      const existsAppointment = appointmentsByDoctorAndDate.find(
        (appointment) => {
          const appointmentDateFormat = formatDate(appointment.date, 'HH:mm')
          return appointmentDateFormat === timeNow
        }
      )

      if (!existsAppointment) {
        freeTime.push({
          time: timeNow,
        })
      }

      timeNow = dayjs(data.date + timeNow)
        .add(duration, 'minute')
        .format('HH:mm')
    }

    return {
      doctorId: data.doctorId,
      freeTime,
    }
  }
}
