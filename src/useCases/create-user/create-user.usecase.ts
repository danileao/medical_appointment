import { User } from '../../entities/user.entity'
import { UserRepository } from '../../repositories/user.repository'

export type UserRequest = {
  name: string
  username: string
  password: string
}

export class CreateUserUseCase {
  async execute(data: UserRequest) {
    const userRepository = UserRepository.getInstance()
    console.log({ userRepository })

    const user = User.create(data)

    if (!data.username || !data.password) {
      throw new Error('Username/password is required.')
    }

    const existUser = await userRepository.findByUsername(data.username)

    if (existUser) {
      throw new Error('Username already exists')
    }
    const userCreated = await userRepository.save(user)

    return userCreated
  }
}
