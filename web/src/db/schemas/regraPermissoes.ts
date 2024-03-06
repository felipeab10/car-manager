import { bigint, mysqlTable, unique } from 'drizzle-orm/mysql-core'
import { regras } from './regras'
import { permissoes } from './permissoes'
import { relations } from 'drizzle-orm'

export const regraPermissoes = mysqlTable(
  'regra_permissoes',
  {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    regra_id: bigint('regra_id', { mode: 'number' })
      .notNull()
      .references(() => regras.id),

    permissao_id: bigint('permissao_id', { mode: 'number' })
      .notNull()
      .references(() => permissoes.id),
  },
  (regraPermissoes) => ({
    PermissionUnique: unique('PermissionUnique').on(
      regraPermissoes.regra_id,
      regraPermissoes.permissao_id,
    ),
  }),
)

export const regraPermissoesRelations = relations(
  regraPermissoes,
  ({ one }) => ({
    permissao: one(permissoes, {
      fields: [regraPermissoes.permissao_id],
      references: [permissoes.id],
    }),
    regra: one(regras, {
      fields: [regraPermissoes.regra_id],
      references: [regras.id],
    }),
  }),
)
