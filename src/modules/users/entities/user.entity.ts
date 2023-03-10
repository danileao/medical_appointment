import { randomUUID } from 'crypto'
import { ParameterRequiredError } from '../../../errors/parameter-required.error'
import { PasswordBcrypt } from '../../../infra/shared/crypto/password.bcrypt'

type IUser = {
  name: string
  password: string
  username: string
  avatar?: string | null
}

export class User {
  name: string
  password: string
  username: string
  id: string
  isAdmin: boolean
  avatar?: string | null

  private constructor(props: IUser) {
    if (!props.username || !props.password) {
      throw new ParameterRequiredError('Username/password is required.', 422)
    }

    this.name = props.name
    this.username = props.username
    this.password = props.password
    this.id = randomUUID()
    this.isAdmin = false
    this.avatar = props.avatar
  }

  static async create(props: IUser) {
    if (!props.password) {
      throw new ParameterRequiredError('Username/password is required.', 422)
    }

    const bcrypt = new PasswordBcrypt()
    const passwordHashed = await bcrypt.hash(props.password)
    props.password = passwordHashed

    const user = new User(props)
    return user
  }
}
