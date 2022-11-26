import { Patient } from '../entities/patient.entity'

export interface IPatientRepository {
  save(data: Patient): Promise<Patient>
  findByDocumentOrEmail(
    document: string,
    email: string
  ): Promise<Patient | null>
}
