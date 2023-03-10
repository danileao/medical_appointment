import { CustomError } from '../../../../errors/custom.error'
import { IPasswordCrypto } from '../../../../infra/shared/crypto/password.crypto'
import { IToken } from '../../../../infra/shared/token/token'
import { IUserRespository } from '../../repositories/user.repository'
import { sign } from 'jsonwebtoken'
import { CreateConnectionRedis } from '../../../../infra/providers/redis'

type AuthenticateRequest = {
  username: string
  password: string
}

export class AuthenticateUserUseCase {
  /*
  * username
    password
    validar se o usuário existe no sistema
    validar se a senha está correta

    mariana
    12345678
    $jsdf92349234jsdfsdf9234j234

  */

  constructor(
    private userRepository: IUserRespository,
    private passwordCrypto: IPasswordCrypto,
    private token: IToken
  ) {}

  async execute({ username, password }: AuthenticateRequest) {
    if (!username || !password) {
      throw new CustomError('Username/password incorrect', 401)
    }

    const user = await this.userRepository.findByUsername(username)

    if (!user) {
      throw new CustomError('Username/password incorrect', 401)
    }

    const comparePasswordEquals = await this.passwordCrypto.compare(
      password,
      user.password
    )

    if (!comparePasswordEquals) {
      throw new CustomError('Username/password incorrect', 401)
    }

    const tokenGenerated = this.token.create(user)

    // Gerar um refresh_token

    const refreshTokenSecret = process.env.SECRET_KEY_REFRESH_TOKEN || ''

    const refreshToken = sign({}, refreshTokenSecret, {
      subject: user.id,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
    })
    // Salvar no redis

    const redisClient = new CreateConnectionRedis()
    await redisClient.setValue(user.id, refreshToken)

    return {
      token: tokenGenerated,
      refreshToken,
    }
  }
}
