import { db } from '@/db'
import { OrdemServico, OrdemServicoType } from '@/db/schemas'

export class OrdemRepository {
  async findAll() {
    return await db.query.OrdemServico.findMany()
  }

  async create(attributes: OrdemServicoType) {
    await db.insert(OrdemServico).values(attributes)
  }
}
