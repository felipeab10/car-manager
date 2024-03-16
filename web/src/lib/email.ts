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

  console.log('transport', transport)

  try {
    const transportVerify = await transport.verify()

    console.log('transportVerify', transportVerify)
  } catch (error) {
    console.log(error)
  }

  try {
    const trasportSend = await transport.sendMail({
      from: SMTP_EMAIL,
      to,
      subject,
      html: body,
    })

    console.log('trasportSend', trasportSend)
  } catch (error) {
    console.log(error)
  }
}
