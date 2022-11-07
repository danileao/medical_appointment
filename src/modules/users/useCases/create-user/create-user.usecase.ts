import { CustomError } from '../../../../errors/custom.error'
import { ParameterRequiredError } from '../../../../errors/parameter-required.error'
import { IPasswordCrypto } from '../../../../infra/shared/crypto/password.crypto'
import { User } from '../../entities/user.entity'
import { IUserRespository } from '../../repositories/user.repository'

export type UserRequest = {
  name: string
  username: string
  password: string
}

export class CreateUserUseCase {
  constructor(private userRepository: IUserRespository) {}

  async execute(data: UserRequest) {
    const user = await User.create(data)

    if (!data.username || !data.password) {
      throw new ParameterRequiredError('Username/password is required.', 422)
    }

    const existUser = await this.userRepository.findByUsername(data.username)

    if (existUser) {
      throw new CustomError('Username already exists', 400, 'USER_EXISTS_ERROR')
    }

    const userCreated = await this.userRepository.save(user)

    return userCreated
  }
}
