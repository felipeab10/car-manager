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

  if (!user) {
    throw new Error('USER_NOT_FOUND')
  }

  let permissoes = null

  try {
    permissoes = await db.query.regraPermissoes.findMany({
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
  } catch (error) {}

  if (!user.ativo) {
    throw new Error('USER_NOT_ACTIVE')
  }

  const match = await bcrypt.compare(password, user.password)

  if (!match) {
    throw new Error('INVALID_CREDENTIALS')
  }

  return {
    ...user,
    permissoes: permissoes?.map((item) => item.permissao),
    name: user.nome,
    id: String(user.id),
  }
}
