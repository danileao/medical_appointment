import { PatientWithUserDTO } from '../dto/patient.dto'
import { Patient } from '../entities/patient.entity'

export interface IPatientRepository {
  save(data: Patient): Promise<Patient>
  findByDocumentOrEmail(
    document: string,
    email: string
  ): Promise<Patient | null>
  findById(id: string): Promise<Patient | null>

  findByUserId(userId: string): Promise<PatientWithUserDTO | null>
}
