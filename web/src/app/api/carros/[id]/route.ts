import {
  destroy,
  procurarCarroPeloId,
  update,
} from '@/app/domains/services/carroService'
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'

export async function GET(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const id = context.params.id

  const carro = await procurarCarroPeloId(id)

  if (!carro) {
    return NextResponse.json(
      { message: 'Carro não encontrado!' },
      { status: 404 },
    )
  }

  return NextResponse.json(carro)
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const id = context.params.id

  const params = await request.json()

  const schema = z.object({
    marca_id: z
      .custom<number | string>()
      .refine((value) => value ?? false, 'Required')
      .refine((value) => Number.isFinite(Number(value)), 'Invalid number')
      .transform((value) => Number(value)),
    modelo_id: z
      .custom<number | string>()
      .refine((value) => value ?? false, 'Required')
      .refine((value) => Number.isFinite(Number(value)), 'Invalid number')
      .transform((value) => Number(value)),
    usuario_id: z
      .custom<number | string>()
      .refine((value) => value ?? false, 'Required')
      .refine((value) => Number.isFinite(Number(value)), 'Invalid number')
      .transform((value) => Number(value)),
    ano: z.string().optional(),
    placa: z.string(),
    renavam: z.string().optional(),
    cor: z.string().optional(),
    quantidade_portas: z.string().optional(),
    combustivel: z.string().optional(),
  })

  const formValidate = schema.safeParse(params)

  if (!formValidate.success) {
    const errors = formValidate.error.formErrors.fieldErrors

    return NextResponse.json({ ...errors }, { status: 422 })
  }

  const carro = await procurarCarroPeloId(id)

  if (!carro) {
    return NextResponse.json(
      { message: 'Carro não encontrado!' },
      { status: 404 },
    )
  }

  try {
    const carro = await update(id, params)

    return NextResponse.json({ status: 'success', carro })
  } catch (error) {
    return NextResponse.json({ error }, { status: 422 })
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const id = context.params.id

  const carro = await procurarCarroPeloId(id)

  if (!carro) {
    return NextResponse.json(
      { message: 'Carro não encontrado!' },
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
