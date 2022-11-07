import { Request, Response } from 'express'
import { ISpecialityRepository } from '../../repositories/speciality.repository'
import { CreateSpecialityUseCase } from './create-speciality.usecase'

export class CreateSpecialityController {
  constructor(private specialityRepository: ISpecialityRepository) {}

  async handle(request: Request, response: Response) {
    try {
      const useCase = new CreateSpecialityUseCase(this.specialityRepository)

      const result = await useCase.execute(request.body)

      return response.json(result)
    } catch (err: any) {
      return response.status(err.statusCode || 400).json({
        error: err.message,
      })
    }
  }
}
