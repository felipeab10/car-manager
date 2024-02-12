import * as z from 'zod'
import {
  BuscarPeloEmail,
  StoreUsuario,
  Update,
  Usuarios,
} from '../repositories/usuarioRepository'

export interface UsuarioType {
  nome: string
  email: string
  password: string
  ativo?: boolean
}

export async function TodosUsuarios() {
  return Usuarios()
}

export async function BuscarUsuarioPeloEmail(email: string) {
  return await BuscarPeloEmail(email)
}

export async function CriarUsuario(attributes: UsuarioType) {
  const schema = z.object({
    nome: z.string(),
    email: z.string(),
    password: z.string(),
  })

  const formValidate = schema.safeParse(attributes)

  if (!formValidate.success) {
    const errors = formValidate.error.formErrors

    return {
      isValid: false,
      errors,
    }
  }

  await StoreUsuario(attributes)

  const usuario = await BuscarPeloEmail(attributes.email)

  return {
    isValid: true,
    errors: null,
    usuario,
  }
}

export async function update(attributes: UsuarioType) {
  const schema = z.object({
    nome: z.string(),
    email: z.string(),
    password: z.string().min(8).optional(),
  })

  const formValidate = schema.safeParse(attributes)

  if (!formValidate.success) {
    const errors = formValidate.error.formErrors

    return {
      isValid: false,
      errors,
    }
  }

  const usuario = await BuscarPeloEmail(attributes.email)

  if (!usuario) {
    return {
      isValid: false,
      errors: { status: 404, message: 'Usuário não encontrado!' },
    }
  }

  await Update({ id: usuario.id, attributes })

  return {
    isValid: true,
    errors: null,
    usuario,
  }
}
