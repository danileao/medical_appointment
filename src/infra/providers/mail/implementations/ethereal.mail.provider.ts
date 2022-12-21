import nodemailer, { Transporter } from 'nodemailer'

import { IMailProvider, MailDTO } from '../mail.provider'

export class EtherealMailProvider implements IMailProvider {
  private client!: Transporter

  constructor() {
    nodemailer
      .createTestAccount()
      .then(() => {
        const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
            user: 'brittany.sauer83@ethereal.email',
            pass: 'r8WaVpgHGW1tfFkqQC',
          },
        })

        this.client = transporter
      })
      .catch((err) => console.log(err))
  }

  async sendMail(data: MailDTO): Promise<void> {
    const resultMail = await this.client.sendMail({
      to: data.to,
      from: data.from,
      subject: data.subject,
      text: data.text,
      html: data.html,
    })

    console.log('Message sent: %s', resultMail.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(resultMail))
  }
}
