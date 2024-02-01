import {
  bigint,
  boolean,
  index,
  mysqlTable,
  varchar,
} from 'drizzle-orm/mysql-core'

export const users = mysqlTable(
  'users',
  {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    nome: varchar('nome', { length: 256 }).notNull(),
    email: varchar('email', { length: 256 }).notNull(),
    password: varchar('password', { length: 256 }).notNull(),
    ativo: boolean('ativo').default(true),
  },
  (users) => ({
    nameIdx: index('name_idx').on(users.email),
  }),
)
// export const authOtps = mysqlTable('auth_otp', {
//   id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
//   phone: varchar('phone', { length: 256 }),
//   userId: int('user_id').references(() => users.id),
// })
