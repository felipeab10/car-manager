import { db } from '@/db'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

interface authenticateProps {
  email: string
  password: string
}
export async function authenticate({ email, password }: authenticateProps) {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email) && eq(users.password, password),
  })
}
