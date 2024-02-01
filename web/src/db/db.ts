import dotenv from 'dotenv'

import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'
dotenv.config({ path: '.env.local' })

const connection = await mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
})

export const db = drizzle(connection)
