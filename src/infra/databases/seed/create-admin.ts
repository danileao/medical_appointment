import { PasswordBcrypt } from '../../shared/crypto/password.bcrypt'
import { prismaClient } from '../prisma.config'

async function main() {
  const password = await new PasswordBcrypt().hash('admin')
  await prismaClient.user.create({
    data: {
      name: 'admin',
      password,
      username: 'admin',
      isAdmin: true,
    },
  })
}

main()
