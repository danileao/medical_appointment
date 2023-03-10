import { CreateConnectionRedis } from '../../../../infra/providers/redis'
import { sign, verify } from 'jsonwebtoken'
import { TokenError } from '../../../../errors/token.error'
import { IToken } from '../../../../infra/shared/token/token'
import { IUserRespository } from '../../repositories/user.repository'

class RefreshTokenUseCase {
  constructor(
    private token: IToken,
    private userRepository: IUserRespository
  ) {}

  async execute(refreshToken: string) {
    // Recuperar o refreshToken do redis
    // Verificar se o refreshToken é valido
    // Gerar um novo token
    const secretKeyRefreshToken = process.env.SECRET_KEY_REFRESH_TOKEN || ''
    try {
      const { sub } = verify(refreshToken, secretKeyRefreshToken)

      const redisClient = new CreateConnectionRedis()
      const refreshTokenRedis = await redisClient.getValue(String(sub))

      if (refreshToken !== refreshTokenRedis) {
        throw new TokenError('Refresh Token Incorrect', 401)
      }

      const user = await this.userRepository.findById(String(sub))

      if (!user) {
        throw new Error('User does not exists!')
      }

      const tokenGenerated = this.token.create(user)

      // Gerar um refresh_token

      const refreshTokenSecret = process.env.SECRET_KEY_REFRESH_TOKEN || ''

      const newRefreshToken = sign({}, refreshTokenSecret, {
        subject: user.id,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
      })
      // Salvar no redis

      await redisClient.setValue(user.id, newRefreshToken)

      return {
        token: tokenGenerated,
        refreshToken: newRefreshToken,
      }
    } catch (err) {
      throw new TokenError('Token incorrect', 401)
    }
  }
}

export { RefreshTokenUseCase }
