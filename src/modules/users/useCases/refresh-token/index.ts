import { JWTToken } from '../../../../infra/shared/token/jwt.token'
import { UserPrismaRepository } from '../../repositories/implementations/user.prisma.repository'
import { RefreshTokenController } from './refresh-token.controller'

const jwtToken = new JWTToken()
const userPrismaRepository = new UserPrismaRepository()

const refreshTokenController = new RefreshTokenController(
  jwtToken,
  userPrismaRepository
)

export { refreshTokenController }
