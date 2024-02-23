import { relations, type InferSelectModel } from 'drizzle-orm'
import { bigint, date, json, mysqlTable, varchar } from 'drizzle-orm/mysql-core'
import { carros } from '.'

export const OrdemServico = mysqlTable('ordem_servicos', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
  carro_id: bigint('carro_id', { mode: 'number' })
    .notNull()
    .references(() => carros.id),
  //  /Enviar quantidade, e valor de cada peça
  pecas: json('pecas'),
  estabelecimento_servico: varchar('estabelecimento_servico', {
    length: 256,
  }).notNull(),
  data: date('data').notNull(),
  valor_servico: varchar('valor_servico', { length: 256 }),
  carro_km: varchar('carro_km', { length: 256 }),
  observacao: varchar('observacao', { length: 256 }),
  servicos: json('servicos'),
})

export const OrdemServicoRelations = relations(OrdemServico, ({ one }) => ({
  carro: one(carros, {
    fields: [OrdemServico.carro_id],
    references: [carros.id],
  }),
}))

export type OrdemServicoType = InferSelectModel<typeof OrdemServico>
