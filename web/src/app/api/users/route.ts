import {
  BuscarUsuarioPeloEmail,
  CriarUsuario,
  TodosUsuarios,
  update,
} from '@/app/domains/services/usuarioService'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ usuarios: await TodosUsuarios() }, { status: 200 })
}

export async function POST(request: NextRequest) {
  const params = await request.json()

  const userExist = await BuscarUsuarioPeloEmail(params.email)

  if (userExist) {
    return NextResponse.json(
      { message: 'Usuário já cadastrado.' },
      { status: 422 },
    )
  }

  try {
    const validate = await CriarUsuario(params)

    if (validate && !validate?.isValid) {
      return NextResponse.json(
        { error: { message: 'Invalid request', errors: validate?.errors } },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { status: 'Success', ...validate },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json({ status: 'Error', error }, { status: 422 })
  }
}

export async function PUT(request: NextRequest) {
  const params = await request.json()

  try {
    const validate = await update(params)

    if (validate && !validate.isValid) {
      const { errors } = validate as {
        errors: { message: string; status: number }
      }

      return NextResponse.json({ errors }, { status: errors.status })
    }

    return NextResponse.json(
      { status: 'Success', ...validate },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ status: 'Error', error }, { status: 422 })
  }
}

export async function DELETE() {
  return NextResponse.json({})
}
