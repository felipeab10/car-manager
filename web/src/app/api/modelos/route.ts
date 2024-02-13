import { TodosModelos } from '@/app/domains/repositories/modeloRepository'
import {
  ProcurarModeloPeloNome,
  store,
} from '@/app/domains/services/modeloService'
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'

export async function GET() {
  const modelos = await TodosModelos()

  return NextResponse.json(modelos)
}

export async function POST(request: NextRequest) {
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

  const modeloExist = await ProcurarModeloPeloNome(params.nome)

  if (modeloExist) {
    return NextResponse.json({ message: 'Modelo já criado' }, { status: 422 })
  }

  try {
    const modelo = await store(params)

    return NextResponse.json({ status: 'success', modelo }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error }, { status: 422 })
  }
}
