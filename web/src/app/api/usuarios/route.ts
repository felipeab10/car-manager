import {
  BuscarUsuarioPeloEmail,
  CriarUsuario,
  TodosUsuarios,
} from '@/app/domains/services/usuarioService'
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'

export async function GET() {
  return NextResponse.json(await TodosUsuarios(), { status: 200 })
}

export async function POST(request: NextRequest) {
  const params = await request.json()

  const schema = z.object({
    nome: z.string(),
    email: z.string(),
    password: z.string(),
  })

  const formValidate = schema.safeParse(params)

  if (!formValidate.success) {
    const errors = formValidate.error.formErrors.fieldErrors

    return NextResponse.json({ ...errors }, { status: 422 })
  }

  const userExist = await BuscarUsuarioPeloEmail(params.email)

  if (userExist) {
    return NextResponse.json(
      { message: 'Usuário já cadastrado.' },
      { status: 422 },
    )
  }

  try {
    const usuario = await CriarUsuario(params)

    return NextResponse.json({ status: 'Success', usuario }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ status: 'Error', error }, { status: 422 })
  }
}
