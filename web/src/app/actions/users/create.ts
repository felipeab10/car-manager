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

export async function CreateUserAction(
  formData: UsuarioCreateType,
): Promise<UsuarioResponseType | undefined> {
  try {
    return (await CriarUsuario(formData)) as UsuarioResponseType
  } catch (error) {
    return error as UsuarioResponseType
  }
}
