export type MailDTO = {
  from: string
  to: string
  text?: string
  html?: string
  subject: string
}

export interface IMailProvider {
  sendMail(data: MailDTO): Promise<void>
}
