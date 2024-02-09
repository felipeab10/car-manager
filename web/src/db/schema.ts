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
