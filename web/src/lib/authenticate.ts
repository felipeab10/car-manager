import { db } from '@/db'
import { users } from '@/db/schemas'
import { eq } from 'drizzle-orm'
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
    id: String(user.id),
  }
}
