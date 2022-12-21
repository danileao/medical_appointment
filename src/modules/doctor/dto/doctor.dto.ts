export type DoctorWithUserDTO = {
  id: string
  crm: string
  email: string
  userId: string
  specialityId: string
  user: {
    name: string
  }
}
