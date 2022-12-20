import { DoctorSchedule } from '../entities/doctor-schedule.entity'
import {
  Doctor,
  DoctorInfo,
  DoctorSchedules as DoctorSchedulesPrisma,
} from '@prisma/client'
import { generateUUID } from '../../../utils/generateUUID'

export type DoctorScheduleWeek = {
  startAt: string
  endAt: string
  dayOfWeek: number
  doctorId: string
  doctor: {
    doctorInfo: {
      duration: number
    }
  }
}

export class DoctorScheduleMapper {
  static entityToPrisma = (data: DoctorSchedule): DoctorSchedulesPrisma[] => {
    const doctorSchedulePrisma: DoctorSchedulesPrisma[] = []
    data.schedules.forEach((schedule) => {
      doctorSchedulePrisma.push({
        day_of_week: schedule.dayOfWeek,
        doctor_id: data.doctorId,
        end_at: schedule.endAt,
        start_at: schedule.startAt,
        id: schedule.id ?? generateUUID(),
      })
    })

    return doctorSchedulePrisma
  }

  static prismaToEntity = (
    schedule: DoctorSchedulesPrisma & {
      doctor: Doctor & { doctorInfo: DoctorInfo | null }
    }
  ): DoctorScheduleWeek => {
    return {
      doctorId: schedule.doctor_id,
      startAt: schedule.start_at,
      endAt: schedule.end_at,
      dayOfWeek: schedule.day_of_week,
      doctor: {
        doctorInfo: {
          duration: schedule.doctor.doctorInfo?.duration || 0,
        },
      },
    }
  }
}
