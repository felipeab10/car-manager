import {
  bigint,
  boolean,
  index,
  mysqlTable,
  timestamp,
  unique,
  varchar,
} from 'drizzle-orm/mysql-core'
import { InferSelectModel, relations } from 'drizzle-orm'
import { carros } from '.'
import { usuarioRegra } from './usuarioRegra'

export const users = mysqlTable(
  'usuarios',
  {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    nome: varchar('nome', { length: 256 }).notNull(),
    email: varchar('email', { length: 256 }).notNull(),
    imagem_profile: varchar('imagem_profile', { length: 256 }),
    password: varchar('password', { length: 256 }).notNull(),
    ativo: boolean('ativo').default(false),
    active_token: varchar('active_token', { length: 256 }),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  },
  (users) => ({
    nameIdx: index('name_idx').on(users.email),
    emailUnique: unique('emailUnique').on(users.email),
  }),
)

export const usuariosRelations = relations(users, ({ many }) => ({
  carros: many(carros),
  regras: many(usuarioRegra),
}))

export type usuarioType = InferSelectModel<typeof users>
