import {
  ProcurarModeloPeloId,
  destroy,
  update,
} from '@/app/domains/services/modeloService'
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const id = context.params.id

  const params = await request.json()

  const schema = z.object({
    nome: z.string(),
    marca_id: z
      .custom<number | string>()
      .refine((value) => value ?? false, 'Required')
      .refine((value) => Number.isFinite(Number(value)), 'Invalid number')
      .transform((value) => Number(value)),
  })

  const formValidate = schema.safeParse(params)

  if (!formValidate.success) {
    const errors = formValidate.error.formErrors.fieldErrors

    return NextResponse.json({ ...errors }, { status: 422 })
  }

  const modeloExist = await ProcurarModeloPeloId(id)

  if (!modeloExist) {
    return NextResponse.json(
      { message: 'Modelo não encontrado!' },
      { status: 404 },
    )
  }

  try {
    const modelo = await update(Number(id), params)

    return NextResponse.json({ status: 'success', modelo })
  } catch (error) {
    return NextResponse.json({ error }, { status: 422 })
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const id = context.params.id

  const modeloExist = await ProcurarModeloPeloId(id)

  if (!modeloExist) {
    return NextResponse.json(
      { message: 'Modelo não encontrado!' },
      { status: 404 },
    )
  }

  try {
    await destroy(Number(id))

    return NextResponse.json({ status: 'success' })
  } catch (error) {
    return NextResponse.json({ error }, { status: 422 })
  }
}
