import { User } from '../../entities/user.entity'
import { ParameterRequiredError } from '../../errors/parameter-required.error'
import { UserRepository } from '../../repositories/user.repository'

export type UserRequest = {
  name: string
  username: string
  password: string
}

export class CreateUserUseCase {
  async execute(data: UserRequest) {
    const userRepository = UserRepository.getInstance()

    const user = User.create(data)

    if (!data.username || !data.password) {
      throw new ParameterRequiredError('Username/password is required.', 422)
    }

    const existUser = await userRepository.findByUsername(data.username)

    if (existUser) {
      throw new Error('Username already exists')
    }
    const userCreated = await userRepository.save(user)

    return userCreated
  }
}
