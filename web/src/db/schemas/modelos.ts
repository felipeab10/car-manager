import {
  mysqlTable,
  varchar,
  timestamp,
  index,
  unique,
  bigint,
} from 'drizzle-orm/mysql-core'

import { carros, marcas } from '.'
import { relations } from 'drizzle-orm'

export const modelos = mysqlTable(
  'modelos',
  {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    nome: varchar('nome', { length: 256 }).notNull(),
    marca_id: bigint('marca_id', { mode: 'number' })
      .notNull()
      .references(() => marcas.id),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  },
  (modelos) => ({
    nomeIdx: index('nome_idx').on(marcas.nome),
    nomeUnique: unique('nomeUnique').on(modelos.nome),
  }),
)

export const modelosRelations = relations(modelos, ({ one }) => ({
  marca: one(marcas, {
    fields: [modelos.marca_id],
    references: [marcas.id],
  }),
  carro: one(carros, {
    fields: [modelos.id],
    references: [carros.modelo_id],
  }),
}))
