import { findOrdemServicoById } from '@/app/domains/services/ordemServicoService'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  context: { params: { id: string } },
) {
  const id = context.params.id

  const ordemServicoExist = await findOrdemServicoById(id)

  if (!ordemServicoExist) {
    return NextResponse.json(
      { message: 'Modelo não encontrado!' },
      { status: 404 },
    )
  }

  try {
    return NextResponse.json(ordemServicoExist)
  } catch (error) {
    return NextResponse.json({ error }, { status: 422 })
  }
}
