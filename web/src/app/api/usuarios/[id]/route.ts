import { BuscarPeloId } from '@/app/domains/repositories/usuarioRepository'
import {
  BuscarUsuarioPeloId,
  destroy,
  update,
} from '@/app/domains/services/usuarioService'
import { NextRequest, NextResponse } from 'next/server'
import z from 'zod'

export async function GET(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const id = context.params.id

  const usuario = await BuscarUsuarioPeloId(id)

  return NextResponse.json(usuario)
}

export async function PUT(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const id = context.params.id

  const params = await request.json()

  const schema = z.object({
    nome: z.string(),
    email: z.string(),
    password: z.string().min(8).optional(),
  })

  const formValidate = schema.safeParse(params)

  if (!formValidate.success) {
    const errors = formValidate.error.formErrors.fieldErrors

    return NextResponse.json({ ...errors }, { status: 422 })
  }

  const usuarioExiste = await BuscarPeloId(id)

  if (!usuarioExiste) {
    return NextResponse.json(
      { message: 'Usuário não encontrado!' },
      { status: 404 },
    )
  }

  try {
    const usuario = await update(id, params)

    return NextResponse.json({ status: 'Success', usuario })
  } catch (error) {
    return NextResponse.json({ status: 'Error', error }, { status: 422 })
  }
}

export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } },
) {
  try {
    const id = context.params.id

    const usuarioExiste = await BuscarPeloId(id)

    if (!usuarioExiste) {
      return NextResponse.json(
        { message: 'Usuário não encontrado!' },
        { status: 404 },
      )
    }

    await destroy(id)

    return NextResponse.json({ status: 'Success' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ status: 'Error', error }, { status: 422 })
  }
}
