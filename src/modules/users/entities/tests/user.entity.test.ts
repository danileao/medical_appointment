import { describe, test, expect } from 'vitest'
import { User } from '../user.entity'

describe('User entity', () => {
  test('Should be able to create a new user', async () => {
    const user = await User.create({
      name: 'USER_NAME',
      password: 'PASSWORD_TEST',
      username: 'USERNAME',
    })

    console.log({ user })

    expect(user).toBeInstanceOf(User)
    expect(user).toHaveProperty('id')
    expect(user.password).not.equal('PASSWORD_TEST')
  })
})
