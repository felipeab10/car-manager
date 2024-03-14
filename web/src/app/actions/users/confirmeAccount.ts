'use server'

import { db } from '@/db'
import { users } from '@/db/schemas'
import { eq } from 'drizzle-orm'

export async function ConfirmeAccountAction(
  activeToken: string,
): Promise<boolean> {
  try {
    const result = await db
      .update(users)
      .set({ active_token: null, ativo: true })
      .where(eq(users.active_token, activeToken))

    if (result[0].affectedRows === 0) {
      return false
    }

    return true
  } catch (error) {
    return false
  }
}
