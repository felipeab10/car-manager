import { relations } from 'drizzle-orm'
import {
  bigint,
  index,
  mysqlTable,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/mysql-core'
import { carros, modelos } from '.'

export const marcas = mysqlTable(
  'marcas',
  {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    nome: varchar('nome', { length: 256 }).notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  },
  (marcas) => ({
    nomeIdx: index('nome_idx').on(marcas.nome),
    nomeUnique: unique('nomeUnique').on(marcas.nome),
  }),
)

export const marcasRelations = relations(marcas, ({ many, one }) => ({
  modelos: many(modelos),
  carro: one(carros, {
    fields: [marcas.id],
    references: [carros.marca_id],
  }),
}))
