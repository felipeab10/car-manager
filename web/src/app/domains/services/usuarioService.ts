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
  ativo?: boolean
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
