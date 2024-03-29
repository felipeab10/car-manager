import dotenv from 'dotenv'

import type { Config } from 'drizzle-kit'

dotenv.config({ path: '.env.local' })

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is missing')
}

export default {
  out: './src/db/migrations',
  schema: './src/db/schemas/*',
  breakpoints: true,
} satisfies Config
