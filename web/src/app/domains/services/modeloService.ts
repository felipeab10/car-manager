import {
  Delete,
  ProcurarPeloId,
  ProcurarPeloNome,
  TodosModelos,
  create,
  updateModelo,
} from '../repositories/modeloRepository'

export interface ModeloType {
  nome: string
  marca_id: number
}

export async function index() {
  return await TodosModelos()
}

export async function ProcurarModeloPeloId(id: string) {
  return await ProcurarPeloId(id)
}

export async function ProcurarModeloPeloNome(nome: string) {
  return await ProcurarPeloNome(nome)
}

export async function store(attributes: ModeloType) {
  return await create(attributes)
}

export async function update(id: number, attributes: ModeloType) {
  return await updateModelo(id, attributes)
}

export async function destroy(id: number) {
  await Delete(id)
}
