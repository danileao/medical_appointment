import { CustomError } from '../../../../errors/custom.error'
import { User } from '../../../users/entities/user.entity'
import { IUserRespository } from '../../../users/repositories/user.repository'
import { IPatientRepository } from '../../repositories/patient.repository'
import { Patient } from '../../entities/patient.entity'

export type CreatePatientRequest = {
  username: string
  password: string
  email: string
  name: string
  document: string
}

export class CreatePatientUseCase {
  constructor(
    private userRepository: IUserRespository,
    private patientRepository: IPatientRepository
  ) {}

  async execute(data: CreatePatientRequest) {
    const user = await User.create({
      name: data.name,
      password: data.password,
      username: data.username,
    })

    const existUser = await this.userRepository.findByUsername(data.username)

    if (existUser) {
      throw new CustomError('Username already exists', 400, 'USER_EXISTS_ERROR')
    }

    const existPatient = await this.patientRepository.findByDocumentOrEmail(
      data.document,
      data.email
    )

    if (existPatient) {
      throw new CustomError('Patient already exists!')
    }
    const userCreated = await this.userRepository.save(user)

    const patient = Patient.create({
      document: data.document,
      email: data.email,
      userId: userCreated.id,
    })
    const patientCreated = await this.patientRepository.save(patient)

    return patientCreated
  }
}
