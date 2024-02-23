import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { CarroType } from '../services/carroService'
import { carros } from '@/db/schemas'

export class CarroRepository {
  async findAll() {
    return await db.query.carros.findMany({
      with: {
        marca: true,
        modelo: true,
        usuario: {
          columns: {
            password: false,
            ativo: false,
          },
        },
      },
    })
  }

  async procurarCarroPelaPlaca(placa: string) {
    return await db.query.carros.findFirst({
      where: eq(carros.placa, placa),
      with: {
        marca: true,
        modelo: true,
      },
    })
  }

  async procurarCarroPeloId(id: string) {
    return await db.query.carros.findFirst({
      where: eq(carros.id, Number(id)),
      with: {
        marca: true,
        modelo: true,
        OrdemServicos: true,
      },
    })
  }

  async create(attributes: CarroType) {
    await db.insert(carros).values(attributes)

    return await this.procurarCarroPelaPlaca(attributes.placa)
  }

  async update(id: string, attributes: CarroType) {
    await db
      .update(carros)
      .set(attributes)
      .where(eq(carros.id, Number(id)))

    return await this.procurarCarroPeloId(id)
  }

  async destroy(id: string) {
    await db.delete(carros).where(eq(carros.id, Number(id)))
  }
}
