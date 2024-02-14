import dotenv from 'dotenv'

import type { Config } from 'drizzle-kit'

dotenv.config({ path: '.env.local' })

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing')
}

export default {
  out: './src/db/migrations',
  schema: './src/db/schema.ts',
  breakpoints: true,
  driver: 'mysql2',
  dbCredentials: {
    host: process.env.DATABASE_HOST ?? '',
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME ?? '',
  },
} satisfies Config
