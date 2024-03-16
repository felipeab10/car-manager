'use server'

import { CriarUsuario } from '@/app/domains/services/usuarioService'

export interface UsuarioResponseType {
  id: number
  nome: string
  email: string
  password?: string
  imagem_profile?: string | null
  ativo?: boolean | null
  error?: boolean
  message?: string
  active_token?: string
}

interface UsuarioCreateType {
  nome: string
  email: string
  password: string
  imagem_profile?: string | null
  ativo?: boolean | null
}

export async function CreateUserAction(formData: UsuarioCreateType) {
  try {
    return JSON.stringify(await CriarUsuario(formData))
  } catch (error) {
    return JSON.stringify(error)
  }
}
