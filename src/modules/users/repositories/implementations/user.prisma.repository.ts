import { prismaClient } from '../../../../infra/databases/prisma.config'
import { User } from '../../entities/user.entity'
import { IUserRespository } from '../user.repository'

export class UserPrismaRepository implements IUserRespository {
  async findByUsername(username: string): Promise<User | undefined> {
    const user = await prismaClient.user.findUnique({
      where: {
        username,
      },
    })

    return user || undefined
  }
  async save(data: User): Promise<User> {
    const user = await prismaClient.user.create({
      data: {
        name: data.name,
        password: data.password,
        username: data.username,
      },
    })

    return user
  }

  async findById(id: string): Promise<User | null> {
    return await prismaClient.user.findUnique({
      where: {
        id,
      },
    })
  }
}
