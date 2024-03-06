import { db } from '@/db'
import bcrypt from 'bcrypt'
import { eq, inArray } from 'drizzle-orm'
import { UsuarioType } from '../services/usuarioService'
import { regraPermissoes, users } from '@/db/schemas'

export async function Usuarios() {
  return await db.query.users.findMany({
    columns: {
      password: false,
    },
  })
}

export async function BuscarPeloEmail(email: string) {
  return await db.query.users.findFirst({
    where: eq(users.email, email),
    columns: {
      password: false,
    },
    with: {
      carros: {
        with: {
          marca: true,
          modelo: true,
        },
      },
    },
  })
}

export async function BuscarPeloId(id: string) {
  const usuario = await db.query.users.findFirst({
    where: eq(users.id, Number(id)),
    columns: {
      password: false,
    },
    with: {
      carros: {
        with: {
          marca: true,
          modelo: true,
        },
      },
      regras: {
        columns: {
          id: true,
          regra_id: false,
          usuario_id: false,
        },
      },
    },
  })

  const permissoes = await db.query.regraPermissoes.findMany({
    where: inArray(
      regraPermissoes.regra_id,
      usuario?.regras.map((r) => r.id) || [],
    ),
    columns: {
      id: false,
      regra_id: false,
      permissao_id: false,
    },
    with: {
      permissao: true,
    },
  })

  return {
    ...usuario,
    permissoes: permissoes.map((item) => item.permissao),
  }
}

export async function StoreUsuario(attributes: UsuarioType) {
  const hashedPassword = await bcrypt.hash(attributes.password, 10)

  await db.insert(users).values({ ...attributes, password: hashedPassword })
}

interface UpdateUserProps {
  id: string
  attributes: UsuarioType
}

export async function Update({ id, attributes }: UpdateUserProps) {
  let hashedPassword

  if (attributes.password) {
    hashedPassword = await bcrypt.hash(attributes.password, 10)
  }

  return await db
    .update(users)
    .set({ ...attributes, password: hashedPassword })
    .where(eq(users.id, Number(id)))
}

export async function Delete(id: string) {
  await db.delete(users).where(eq(users.id, Number(id)))
}
