'use server'

import { BuscarUsuarioPeloEmail } from '@/app/domains/services/usuarioService'

export async function getUserAccount(email: string) {
  const user = await BuscarUsuarioPeloEmail(email)

  if (!user) {
    throw Error('USER_NOT_FOUND')
  }

  return JSON.stringify(user)
}
