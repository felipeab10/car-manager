import * as schema from '@/db/schema'
import dotenv from 'dotenv'

// export const connection = connect({
//   host: process.env.DATABASE_HOST,
//   username: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
// })

// export const db = drizzle(connection)

import { drizzle } from 'drizzle-orm/mysql2'
import mysql from 'mysql2/promise'

// import { connect } from '@planetscale/database'
// import { drizzle } from 'drizzle-orm/planetscale-serverless'

dotenv.config({ path: '.env.local' })

if (
  !process.env.DATABASE_HOST ||
  !process.env.DATABASE_USERNAME ||
  !process.env.DATABASE_NAME ||
  !process.env.DATABASE_PASSWORD
) {
  throw new Error('Database credentials missing.')
}

export const connection = await mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
})

export const db = drizzle(connection, { schema, mode: 'planetscale' })
