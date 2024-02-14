import { CarroRepository } from '../repositories/carroRepository'

export interface CarroType {
  marca_id: number
  modelo_id: number
  usuario_id: number
  ano?: string
  placa: string
  renavam?: string
  cor?: string
  quantidade_portas?: string
  combustivel?: string
}

const carroRepository = new CarroRepository()

export async function index() {
  return await carroRepository.findAll()
}

export async function procurarCarroPeloId(id: string) {
  return await carroRepository.procurarCarroPeloId(id)
}

export async function procurarCarroPelaPlaca(placa: string) {
  return await carroRepository.procurarCarroPelaPlaca(placa)
}

export async function store(attributes: CarroType) {
  return await carroRepository.create(attributes)
}

export async function update(id: string, attributes: CarroType) {
  return await carroRepository.update(id, attributes)
}

export async function destroy(id: string) {
  await carroRepository.destroy(id)
}
