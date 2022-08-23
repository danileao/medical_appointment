import { Request, Response } from 'express'
import { logger } from '../../../../utils/logger'
import { IUserRepositoy } from '../../repositories/user.repository'
import { CreateUserUseCase } from './create-user.usecase'

export class CreateUserController {
  constructor(private useCase: CreateUserUseCase) {
  }
  async handle(request: Request, response: Response) {
    logger.info('Usuário sendo criado!')
    try {
      const data = request.body


      const result = await this.useCase.execute(data)

      return response.json(result)
    } catch (err: any) {
      logger.error(err.stack)
      return response.status(400).json(err.message)
    }
  }
}
