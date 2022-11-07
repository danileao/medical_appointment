import { Request, Response } from 'express'
import { CreateDoctorUseCase } from './create-doctor.usecase'
import { ISpecialityRepository } from '../../../speciality/repositories/speciality.repository'
import { IDoctorRepository } from '../../repositories/doctor.repository'
import { IUserRespository } from '../../../users/repositories/user.repository'

export class CreateDoctorController {
  constructor(
    private userRepository: IUserRespository,
    private doctorRepository: IDoctorRepository,
    private specialityRepository: ISpecialityRepository
  ) {}

  async handle(request: Request, response: Response) {
    const { body } = request
    const createDoctorUseCase = new CreateDoctorUseCase(
      this.userRepository,
      this.doctorRepository,
      this.specialityRepository
    )

    const doctorCreated = await createDoctorUseCase.execute(body)
    return response.json(doctorCreated)
  }
}
