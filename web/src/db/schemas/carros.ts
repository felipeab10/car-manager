import { relations } from 'drizzle-orm'
import {
  bigint,
  index,
  mysqlTable,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/mysql-core'
import { OrdemServico, marcas, modelos, users } from '.'

export const carros = mysqlTable(
  'carros',
  {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    marca_id: bigint('marca_id', { mode: 'number' })
      .notNull()
      .references(() => marcas.id),
    modelo_id: bigint('modelo_id', { mode: 'number' })
      .notNull()
      .references(() => modelos.id),
    usuario_id: bigint('usuario_id', { mode: 'number' })
      .notNull()
      .references(() => users.id),
    ano: varchar('ano', { length: 4 }),
    placa: varchar('placa', { length: 14 }).notNull(),
    renavam: varchar('renavam', { length: 60 }),
    cor: varchar('cor', { length: 60 }),
    quantidade_portas: varchar('quantidade_portas', { length: 10 }),
    image: varchar('image', { length: 256 }),
    combustivel: varchar('combustivel', { length: 10 }),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  },
  (carros) => ({
    placaIndex: index('placaIndex').on(carros.placa),
    placaUnique: unique('placaUnique').on(carros.placa),
  }),
)

export const carrosRelations = relations(carros, ({ one, many }) => ({
  marca: one(marcas, {
    fields: [carros.marca_id],
    references: [marcas.id],
  }),
  modelo: one(modelos, {
    fields: [carros.modelo_id],
    references: [modelos.id],
  }),
  usuario: one(users, {
    fields: [carros.usuario_id],
    references: [users.id],
  }),
  OrdemServicos: many(OrdemServico),
}))
