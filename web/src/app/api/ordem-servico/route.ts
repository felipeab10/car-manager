import { index, store } from '@/app/domains/services/ordemServicoService'
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'

export async function GET(request: NextRequest) {
  const ordensServicos = await index()

  return NextResponse.json(ordensServicos)
}

export async function POST(request: NextRequest) {
  const schema = z.object({
    carro_id: z
      .custom<number | string>()
      .refine((value) => value ?? false, 'Required')
      .refine((value) => Number.isFinite(Number(value)), 'Invalid number')
      .transform((value) => Number(value)),

    pecas: z
      .custom<[] | string>()
      .refine((value) => value ?? false, 'Required')
      .refine((value) => isNaN(Number(value)), 'Invalid string')
      .transform((value) => Array(value))
      .optional(),
    estabelecimento_servico: z.string(),
    data: z.string(),
    valor_servico: z.string().optional(),
    carro_km: z.string().optional(),
    observacao: z.string().optional(),
    servicos: z.string().optional(),
  })

  const data = await request.json()
  console.log(data)

  const formValidate = schema.safeParse(data)

  if (!formValidate.success) {
    const errors = formValidate.error.formErrors.fieldErrors

    return NextResponse.json({ ...errors }, { status: 422 })
  }

  try {
    await store(data)

    return NextResponse.json({ status: 'success' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 422 })
  }
}
