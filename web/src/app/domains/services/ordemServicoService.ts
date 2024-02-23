import { OrdemServicoType } from '@/db/schemas'
import { OrdemRepository } from '../repositories/ordemRepository'

const ordemRepository = new OrdemRepository()

export async function index() {
  return await ordemRepository.findAll()
}

export async function store(attributes: OrdemServicoType) {
  await ordemRepository.create(attributes)
}
