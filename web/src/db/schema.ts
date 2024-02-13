import { relations } from 'drizzle-orm'
import {
  bigint,
  boolean,
  index,
  mysqlTable,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'

export const users = mysqlTable(
  'usuarios',
  {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    nome: varchar('nome', { length: 256 }).notNull(),
    email: varchar('email', { length: 256 }).notNull(),
    imagem_profile: varchar('imagem_profile', { length: 256 }),
    password: varchar('password', { length: 256 }).notNull(),
    ativo: boolean('ativo').default(true),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  },
  (users) => ({
    nameIdx: index('name_idx').on(users.email),
  }),
)

export const marcas = mysqlTable(
  'marcas',
  {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    nome: varchar('nome', { length: 256 }).notNull(),
  },
  (marcas) => ({
    nomeIdx: index('nome_idx').on(marcas.nome),
  }),
)

export const marcasRelations = relations(marcas, ({ many }) => ({
  modelos: many(modelos),
}))

export const modelos = mysqlTable(
  'modelos',
  {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    nome: varchar('nome', { length: 256 }).notNull(),
    marca_id: bigint('marca_id', { mode: 'number' })
      .notNull()
      .references(() => marcas.id),
  },
  (marcas) => ({
    nomeIdx: index('nome_idx').on(marcas.nome),
  }),
)

export const modelosRelations = relations(modelos, ({ one }) => ({
  marca: one(marcas, {
    fields: [modelos.marca_id],
    references: [marcas.id],
  }),
}))
