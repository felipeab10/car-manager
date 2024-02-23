import { bigint, mysqlTable, varchar } from 'drizzle-orm/mysql-core'

export const pecas = mysqlTable('pecas', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  nome: varchar('nome', { length: 256 }).notNull(),
})
