import { relations } from 'drizzle-orm'
import { bigint, mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { regraPermissoes } from './regraPermissoes'

export const regras = mysqlTable('regras', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  nome: varchar('nome', { length: 256 }).notNull(),
  descricao: varchar('descricao', { length: 256 }).notNull(),
})

export const regrasRelations = relations(regras, ({ many }) => ({
  permissoes: many(regraPermissoes),
}))
