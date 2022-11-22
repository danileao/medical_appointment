import { describe, test, expect } from 'vitest'
import dayjs from 'dayjs'
import {
  CreateDoctorInfoUseCase,
  DoctorInfoRequest,
} from '../create-doctor-info.usecase'
import { generateUUID } from '../../../../../utils/generate-uuid'
import { DoctoryInfoMemoryRepository } from '../../../repositories/implementations/memory/doctor-info.memory.repository'
import { DoctorMemoryRepository } from '../../../repositories/implementations/memory/doctor-memory.repository'

describe('Create doctor info', () => {
  test('Doctor does not exists!', async () => {
    const doctorInfo: DoctorInfoRequest = {
      doctorId: generateUUID(),
      startAt: dayjs().startOf('day').add(10, 'hour').format('HH:mm'),
      endAt: dayjs().startOf('day').subtract(6, 'hour').format('HH:mm'),
      price: 100,
      duration: 45,
    }

    const doctorRepository = new DoctorMemoryRepository()
    const doctorInfoRepository = new DoctoryInfoMemoryRepository()

    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRepository,
      doctorInfoRepository
    )
    expect(async () => {
      await createDoctorInfoUseCase.execute(doctorInfo)
    }).rejects.toThrow('Doctor does not exists!')
  })

  test('Should be able to create a doctor info', async () => {
    const doctorInfo: DoctorInfoRequest = {
      doctorId: 'ID_DOCTOR',
      startAt: dayjs().startOf('day').add(10, 'hour').format('HH:mm'),
      endAt: dayjs().startOf('day').subtract(6, 'hour').format('HH:mm'),
      price: 100,
      duration: 45,
    }

    const doctorRepository = new DoctorMemoryRepository()
    const doctorInfoRepository = new DoctoryInfoMemoryRepository()

    const createDoctorInfoUseCase = new CreateDoctorInfoUseCase(
      doctorRepository,
      doctorInfoRepository
    )
    expect(async () => {
      await createDoctorInfoUseCase.execute(doctorInfo)
    }).rejects.toThrow('Doctor does not exists!')
  })
})
