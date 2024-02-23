import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { ModeloType } from '../services/modeloService'
import { modelos } from '@/db/schemas'

export async function TodosModelos() {
  return await db.query.modelos.findMany()
}

export async function ProcurarPeloId(id: string | number) {
  // return await db
  //   .select()
  //   .from(modelos)
  //   .innerJoin(marcas, eq(modelos.marca_id, marcas.id))
  //   .where(eq(modelos.id, Number(id)))

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
