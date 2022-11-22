import { randomUUID } from 'crypto'

import { describe, expect, test } from 'vitest'
import { DoctorInfo } from '../doctor-info.entity'

describe('Doctor info entity', () => {
  test('Create a doctor info', () => {
    const doctorInfo = DoctorInfo.create({
      doctorId: randomUUID(),
      duration: 100,
      endAt: '10:00',
      startAt: '09:00',
      price: 100,
    })

    expect(doctorInfo).toHaveProperty('id')
  })
})
