import { User } from "../../../../entities/user.entity"
import { IUserRepositoy } from "../../repositories/user.repository"

export type UserRequest = {
  name: string
  username: string
  password: string
}

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepositoy) { }

  async execute(data: UserRequest) {

    const user = User.create(data)

    if (!data.username || !data.password) {
      throw new Error('Username/password is required.')
    }

    const existUser = await this.userRepository.findByUsername(data.username)

    if (existUser) {
      throw new Error('Username already exists')
    }
    const userCreated = await this.userRepository.save(user)

    return userCreated
  }
}
