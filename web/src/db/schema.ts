import {
  bigint,
  mysqlTable,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/mysql-core'

export const users = mysqlTable(
  'usuarios',
  {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    nome: varchar('nome', { length: 191 }),
    email: varchar('email', { length: 191 }).notNull(),
    imagem_profile: varchar('imagem_profile', { length: 191 }),
    password: varchar('password', { length: 191 }).notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  },
  (user) => ({
    emailIndex: uniqueIndex('users__email__idx').on(user.email),
  }),
)
