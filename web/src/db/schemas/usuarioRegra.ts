import { bigint, mysqlTable, unique } from 'drizzle-orm/mysql-core'
import { regras } from './regras'
import { relations } from 'drizzle-orm'
import { users } from '.'

export const usuarioRegra = mysqlTable(
  'usuario_regras',
  {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    usuario_id: bigint('usuario_id', { mode: 'number' })
      .notNull()
      .references(() => users.id),
    regra_id: bigint('regra_id', { mode: 'number' })
      .notNull()
      .references(() => regras.id),
  },
  (usuarioRegra) => ({
    regraUsuario: unique('regraUsuario').on(
      usuarioRegra.usuario_id,
      usuarioRegra.regra_id,
    ),
  }),
)

export const usuariosRegraRelations = relations(usuarioRegra, ({ one }) => ({
  usuario: one(users, {
    fields: [usuarioRegra.usuario_id],
    references: [users.id],
  }),
  regra: one(regras, {
    fields: [usuarioRegra.regra_id],
    references: [regras.id],
  }),
}))
