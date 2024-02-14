import { procurarCarroPelaPlaca } from '@/app/domains/services/carroService'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  context: { params: { placa: string } },
) {
  const placa = context.params.placa

  const carro = await procurarCarroPelaPlaca(placa)

  if (!carro) {
    return NextResponse.json(
      { message: 'Carro não encontrado!' },
      { status: 404 },
    )
  }

  return NextResponse.json(carro)
}
