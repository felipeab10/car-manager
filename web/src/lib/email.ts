import nodemailer from 'nodemailer'

interface sendMailType {
  to: string
  subject: string
  body: string
}

export async function sendMail({ to, subject, body }: sendMailType) {
  const { SMTP_PASSWORD, SMTP_EMAIL } = process.env

  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: SMTP_EMAIL,
      pass: SMTP_PASSWORD,
    },
  })

  try {
    await transport.verify()
  } catch (error) {
    console.log(error)
  }

  try {
    await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    })
  } catch (error) {
    console.log(error)
  }
}
