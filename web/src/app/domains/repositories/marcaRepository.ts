import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { MarcaType } from '../services/marcaService'
import { marcas } from '@/db/schemas'

export async function procurarPeloId(id: string) {
  return await db.query.marcas.findFirst({
    where: eq(marcas.id, Number(id)),
  })
}

export async function procurarPeloNome(nome: string) {
  return await db.query.marcas.findFirst({
    where: eq(marcas.nome, nome),
  })
}

export async function all() {
  return await db.query.marcas.findMany()
}

export async function create(attributes: MarcaType) {
  return await db.insert(marcas).values(attributes)
}

export async function updateMarca(id: string, attributes: MarcaType) {
  await db
    .update(marcas)
    .set(attributes)
    .where(eq(marcas.id, Number(id)))
}

export async function Delete(id: string) {
  await db.delete(marcas).where(eq(marcas.id, Number(id)))
}
