import { relations } from 'drizzle-orm'
import {
  bigint,
  boolean,
  index,
  mysqlTable,
  timestamp,
  unique,
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
    emailUnique: unique('emailUnique').on(users.email),
  }),
)

export const usuariosRelations = relations(users, ({ many }) => ({
  carros: many(carros),
}))

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

export const carrosRelations = relations(carros, ({ one }) => ({
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
}))
