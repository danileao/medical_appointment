import { DoctorSchedule } from '../entities/doctor-schedule.entity'
import { DoctorScheduleWeek } from '../mapper/doctor-schedule.map'

export interface IDoctorScheduleRepository {
  save(data: DoctorSchedule): Promise<void>
  findByDoctorIdAndDayOfWeek(
    doctorId: string,
    dayOfWeek: number
  ): Promise<DoctorScheduleWeek | null>
}
