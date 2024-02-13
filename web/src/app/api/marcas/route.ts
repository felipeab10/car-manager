import {
  buscarMarcaPeloNome,
  index,
  store,
} from '@/app/domains/services/marcaService'
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'

export async function GET() {
  const marcas = await index()

  return NextResponse.json(marcas)
}

export async function POST(request: NextRequest) {
  const params = await request.json()

  const schema = z.object({
    nome: z.string(),
  })

  const formValidate = schema.safeParse(params)

  if (!formValidate.success) {
    const errors = formValidate.error.formErrors.fieldErrors

    return NextResponse.json({ ...errors }, { status: 422 })
  }

  const marcaExist = await buscarMarcaPeloNome(params.nome)

  if (marcaExist) {
    return NextResponse.json(
      { message: 'Marca já cadastrado.' },
      { status: 422 },
    )
  }

  try {
    const marca = await store(params)

    return NextResponse.json({ status: 'success', marca })
  } catch (error) {
    return NextResponse.json({ status: 'success' }, { status: 422 })
  }
}
