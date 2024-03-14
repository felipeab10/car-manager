'use server'
import { BuscarUsuarioPeloEmail } from '@/app/domains/services/usuarioService'
import { sendMail } from '@/lib/email'

interface SendConfirmationAccountProps {
  to: string
  subject: string
}
export async function SendConfirmationAccount({
  to,
  subject,
}: SendConfirmationAccountProps) {
  const user = await BuscarUsuarioPeloEmail(to)

  const body = `
  <!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="style.css" />
<title>E-mail</title>
</head>
<body>
<h1>
Bem vindo
</h1>
<p>
seu código de confirmação é: ${user?.active_token}
</p>
<script src="script.js"></script>
</body>
</html>
  `
  if (!user?.active_token) return false

  await sendMail({ to, subject, body })

  return true
}
