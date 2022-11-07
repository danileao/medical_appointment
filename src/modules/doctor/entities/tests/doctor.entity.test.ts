import { test, expect, describe } from 'vitest'
import { Doctor } from '../doctor.entity'

describe('Doctor entity', () => {
  test('Should be able to create a new doctor', () => {
    const doctor = Doctor.create({
      crm: '123456',
      email: 'email@email.com',
      specialityId: 'SPEC_ID',
      userId: 'USER_ID',
    })

    expect(doctor).toBeInstanceOf(Doctor)
    expect(doctor).toHaveProperty('id')
  })

  test('Should not be able to create a new doctor with CRM invalid', () => {
    expect(() => {
      Doctor.create({
        crm: '',
        email: 'email@email.com',
        specialityId: 'SPEC_ID',
        userId: 'USER_ID',
      })
    }).toThrow('CRM is required!')
  })

  test('Should not be able to create a new doctor with CRM length invalid', () => {
    expect(() => {
      Doctor.create({
        crm: '12345',
        email: 'email@email.com',
        specialityId: 'SPEC_ID',
        userId: 'USER_ID',
      })
    }).toThrow('CRM length is incorrect!')
  })

  test('Should not be able to create a new doctor with Email invalid', () => {
    expect(() => {
      Doctor.create({
        crm: '123456',
        email: '',
        specialityId: 'SPEC_ID',
        userId: 'USER_ID',
      })
    }).toThrow('Email is required!')
  })
})
