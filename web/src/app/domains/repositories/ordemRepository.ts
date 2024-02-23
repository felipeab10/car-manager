import { db } from '@/db'
import { OrdemServico, OrdemServicoType } from '@/db/schemas'
import { eq } from 'drizzle-orm'

export class OrdemRepository {
  async findAll() {
    return await db.query.OrdemServico.findMany()
  }

  async findById(id: number) {
    return await db.query.OrdemServico.findFirst({
      where: eq(OrdemServico.id, id),
    })
  }

  async create(attributes: OrdemServicoType) {
    await db.insert(OrdemServico).values(attributes)
  }
}
