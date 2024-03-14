import {
  BuscarPeloEmail,
  BuscarPeloId,
  Delete,
  StoreUsuario,
  Update,
  Usuarios,
} from '../repositories/usuarioRepository'

export interface UsuarioType {
  nome: string
  email: string
  password: string
  imagem_profile?: string | null
  ativo?: boolean | null
  regraId?: number
  active_token?: string
}

export async function TodosUsuarios() {
  return Usuarios()
}

export async function BuscarUsuarioPeloEmail(email: string) {
  return await BuscarPeloEmail(email)
}

export async function BuscarUsuarioPeloId(id: string) {
  return await BuscarPeloId(id)
}

export async function CriarUsuario(attributes: UsuarioType) {
  const usuarioExist = await BuscarUsuarioPeloEmail(attributes.email)

  if (usuarioExist) {
    return {
      message: 'USER_ALREADY_CREATED',
      code: 422,
      error: true,
    }
  }

  attributes.active_token = Math.floor(
    100000 + Math.random() * 900000,
  ).toString()

  await StoreUsuario(attributes)

  return await BuscarPeloEmail(attributes.email)
}

export async function update(id: string, attributes: UsuarioType) {
  await Update({ id, attributes })

  return await BuscarPeloId(id)
}

export async function destroy(id: string) {
  await Delete(id)
}
