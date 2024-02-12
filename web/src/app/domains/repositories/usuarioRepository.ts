import { db } from '@/db'
import { users } from '@/db/schema'
import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import { UsuarioType } from '../services/usuarioService'

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
  })
}

export async function StoreUsuario(attributes: UsuarioType) {
  const hashedPassword = await bcrypt.hash(attributes.password, 10)

  await db.insert(users).values({ ...attributes, password: hashedPassword })
}

interface UpdateUserProps {
  id: number
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
    .where(eq(users.id, id))
}
