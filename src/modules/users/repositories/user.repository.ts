import { User } from '../entities/user.entity'

export interface IUserRespository {
  findByUsername(username: string): Promise<User | undefined>
  save(data: User): Promise<User>
  findById(id: string): Promise<User | null>
}
