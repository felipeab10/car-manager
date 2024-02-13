import {
  buscarMarcaPeloId,
  destroy,
  update,
} from '@/app/domains/services/marcaService'
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'

export async function GET(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const id = context.params.id

  const marca = await buscarMarcaPeloId(id)

  return NextResponse.json(marca)
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const params = await request.json()

  const schema = z.object({
    nome: z.string(),
  })

  const formValidate = schema.safeParse(params)

  if (!formValidate.success) {
    const errors = formValidate.error.formErrors.fieldErrors

    return NextResponse.json({ ...errors }, { status: 422 })
  }

  const id = context.params.id

  try {
    const marca = await update(id, params)

    return NextResponse.json({ status: 'success', marca })
  } catch (error) {
    return NextResponse.json({ error }, { status: 422 })
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const id = context.params.id

  const marcaExist = await buscarMarcaPeloId(id)

  if (!marcaExist) {
    return NextResponse.json(
      { message: 'Marca não encontrada!' },
      { status: 404 },
    )
  }
  try {
    await destroy(id)

    return NextResponse.json({ status: 'success' })
  } catch (error) {
    return NextResponse.json({ error }, { status: 422 })
  }
}
