import { db } from '@/db'
import { modelos } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { ModeloType } from '../services/modeloService'

export async function TodosModelos() {
  return await db.query.modelos.findMany()
}

export async function ProcurarPeloId(id: string | number) {
  return await db.query.modelos.findFirst({
    where: eq(modelos.id, Number(id)),
    with: {
      marca: true,
    },
  })
}

export async function ProcurarPeloNome(nome: string) {
  return await db.query.modelos.findFirst({
    where: eq(modelos.nome, nome),
    with: {
      marca: true,
    },
  })
}

export async function create(attributes: ModeloType) {
  await db.insert(modelos).values(attributes)

  return await ProcurarPeloNome(attributes.nome)
}

export async function updateModelo(id: number, attributes: ModeloType) {
  await db.update(modelos).set(attributes).where(eq(modelos.id, id))

  return await ProcurarPeloId(id)
}

export async function Delete(id: number) {
  await db.delete(modelos).where(eq(modelos.id, id))
}
