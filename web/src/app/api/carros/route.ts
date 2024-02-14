import { index, store } from '@/app/domains/services/carroService'
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'

export async function GET() {
  const todosCarros = await index()

  return NextResponse.json(todosCarros)
}

interface duplicateEntryType {
  code: string
  message: string
}

export async function POST(request: NextRequest) {
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

  const params = await request.json()

  const formValidate = schema.safeParse(params)

  if (!formValidate.success) {
    const errors = formValidate.error.formErrors.fieldErrors

    return NextResponse.json({ ...errors }, { status: 422 })
  }

  try {
    const carro = await store(params)
    console.log(carro)

    return NextResponse.json({ status: 'success', carro }, { status: 201 })
  } catch (error) {
    const duplicateEntryType = error as duplicateEntryType

    if (duplicateEntryType?.code === 'ER_DUP_ENTRY') {
      return NextResponse.json(
        {
          error: true,
          message: duplicateEntryType?.message,
          code: duplicateEntryType?.code,
        },
        { status: 422 },
      )
    }
    return NextResponse.json({ error }, { status: 422 })
  }
}
