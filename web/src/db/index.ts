import * as schema from '@/db/schema'
import dotenv from 'dotenv'

import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'

dotenv.config({ path: '.env.local' })

if (!process.env.DATABASE_URL) {
  throw new Error('Database credentials missing.')
}

export const connection = mysql.createPool(process.env.DATABASE_URL as string)

export const db = drizzle(connection, { schema, mode: 'planetscale' })
