import dotenv from 'dotenv'
import { migrate } from 'drizzle-orm/mysql2/migrator'
import { connection, db } from '.'

dotenv.config({ path: '.env.local' })

async function main() {
  console.log('[migrate] Running migrations ...')

  await migrate(db, { migrationsFolder: './src/db/migrations' })

  console.log('[migrate] All migrations have been ran, exiting ...')
  await connection.end()
}

main()
