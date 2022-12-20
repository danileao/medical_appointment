import { describe, expect, test } from 'vitest'
import { generateUUID } from '../../../../../utils/generateUUID'
import { DoctorMemoryRepository } from '../../../../doctor/repositories/implementations/in-memory/doctor-memory.repository'
import { PatientInMemoryRepository } from '../../../../patient/repositories/in-memory/patient.in-memory.repository'
import { CreateAppointmentUseCase } from '../create-appointment.usecase'

describe('Create Appointment', () => {
  test('Should not be able to create an appointment without a patient or with an invalid patient', async () => {
    const patientInMemoryRepository = new PatientInMemoryRepository()
    const doctorInMemoryRepository = new DoctorMemoryRepository()
    const createAppointmentUseCase = new CreateAppointmentUseCase(
      patientInMemoryRepository,
      doctorInMemoryRepository
    )

    expect(async () => {
      await createAppointmentUseCase.execute(
        {
          doctorId: generateUUID(),
          date: new Date(),
        },
        'ID_USER_INVALID'
      )
    }).rejects.toThrow('Patient does not exists!')
  })

  test('Should not be able to create an appointment without a doctor or with an invalid doctor', async () => {
    const patientInMemoryRepository = new PatientInMemoryRepository()
    const doctorInMemoryRepository = new DoctorMemoryRepository()
    const createAppointmentUseCase = new CreateAppointmentUseCase(
      patientInMemoryRepository,
      doctorInMemoryRepository
    )

    const patient = await patientInMemoryRepository.save({
      document: 'DOCUMENT_PATIENT',
      email: 'patient_test@email.com',
      id: generateUUID(),
      userId: generateUUID(),
    })

    expect(async () => {
      await createAppointmentUseCase.execute(
        {
          doctorId: generateUUID(),
          date: new Date(),
        },
        patient.userId
      )
    }).rejects.toThrow('Doctor does not exists!')
  })
})
