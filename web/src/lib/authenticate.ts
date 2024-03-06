import { db } from '@/db'
import { regraPermissoes, users } from '@/db/schemas'
import { eq, inArray } from 'drizzle-orm'
import bcrypt from 'bcrypt'

interface authenticateProps {
  email: string | undefined
  password: string | undefined
}
export async function authenticate({ email, password }: authenticateProps) {
  if (!email || !password) {
    return null
  }

  console.log(email)

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
    with: {
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
      user?.regras.map((r) => r.id) || [],
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

  if (!user) {
    return null
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    return null
  }

  return {
    ...user,
    permissoes: permissoes.map((item) => item.permissao),
    name: user.nome,
    id: String(user.id),
  }
}
