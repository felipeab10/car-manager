import {
  Delete,
  all,
  create,
  procurarPeloId,
  procurarPeloNome,
  updateMarca,
} from '../repositories/marcaRepository'

export interface MarcaType {
  nome: string
}

export async function index() {
  return await all()
}

export async function buscarMarcaPeloNome(nome: string) {
  return await procurarPeloNome(nome)
}

export async function buscarMarcaPeloId(id: string) {
  return await procurarPeloId(id)
}

export async function store(attributes: MarcaType) {
  await create(attributes)

  return await buscarMarcaPeloNome(attributes.nome)
}

export async function update(id: string, attributes: MarcaType) {
  await updateMarca(id, attributes)

  return await buscarMarcaPeloId(id)
}

export async function destroy(id: string) {
  await Delete(id)
}
