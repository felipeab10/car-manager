import dotenv from 'dotenv'

import type { Config } from 'drizzle-kit'

dotenv.config({ path: '.env.local' })

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing')
}

export default {
  schema: './src/db/schema.ts',
  out: './src/db/migrations',
  driver: 'mysql2',
  dbCredentials: {
    host: process.env.DATABASE_HOST ?? '',
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME ?? '',
  },

  verbose: true,
  strict: true,
} satisfies Config

// export default {
//   schema: './src/db/schema.ts',
//   out: './drizzle',
//   driver: 'mysql2',
//   dbCredentials: {
//     host: process.env.DATABASE_HOST ?? '',
//     user: process.env.DATABASE_USERNAME,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME ?? '',
//   },
//   verbose: true,
//   strict: true,
// } satisfies Config
