export type PatientWithUserDTO = {
  document: string
  email: string
  id: string
  userId: string
  user: {
    name: string
  }
}
