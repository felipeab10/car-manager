import { relations } from 'drizzle-orm'
import { bigint, boolean, mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { regraPermissoes } from './regraPermissoes'

export const permissoes = mysqlTable('permissoes', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  nome: varchar('nome', { length: 256 }).notNull(),
  descricao: varchar('descricao', { length: 256 }).notNull(),
  ativo: boolean('ativo').default(true),
})

export const permissoesRelations = relations(permissoes, ({ many }) => ({
  regras: many(regraPermissoes),
}))
