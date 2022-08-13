import { User } from '../entities/user.entity'

export class UserRepository {
  users: User[]

  private static instance: UserRepository

  constructor() {
    this.users = []
  }

  static getInstance() {
    if (!UserRepository.instance) {
      UserRepository.instance = new UserRepository()
    }

    return UserRepository.instance
  }

  async findByUsername(username: string) {
    return this.users.find((user) => user.username === username)
  }

  async save(data: User) {
    this.users.push(data)
    return data
  }
}
