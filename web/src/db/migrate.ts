import 'dotenv/config'
import { migrate } from 'drizzle-orm/mysql2/migrator'
import { connection, db } from '.'

async function main() {
  console.log('[migrate] Running migrations ...')

  await migrate(db, { migrationsFolder: './src/db/migrations' })

  console.log('[migrate] All migrations have been ran, exiting ...')
  await connection.end()
}

main()
