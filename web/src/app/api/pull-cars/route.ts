import { db } from '@/db'
import { marcas, modelos } from '@/db/schemas'
import { sql } from 'drizzle-orm'
import { NextResponse } from 'next/server'
const ENDPOINT = 'https://veiculos.fipe.org.br/api/veiculos'

export async function GET() {
  const totalFetch = { totalMarcas: 0, totalModelos: 0 }

  await fetch(`${ENDPOINT}/ConsultarTabelaDeReferencia`, {
    method: 'post',
  })
    .then((response) => response.json())
    .then((tabelaDeReferencia) => {
      return fetch(
        `${ENDPOINT}/ConsultarMarcas?codigoTabelaReferencia=${tabelaDeReferencia[0].Codigo}&codigoTipoVeiculo=1`,
        { method: 'post' },
      )
        .then((response) => response.json())
        .then(async (marcasRequest) => {
          if (marcasRequest.length) {
            totalFetch.totalMarcas = await insertMarcas(marcasRequest)

            totalFetch.totalModelos = await insertModelos(
              marcasRequest,
              tabelaDeReferencia[0].Codigo,
            )
            return totalFetch
          }
        })
    })

  return NextResponse.json(totalFetch)
}

interface GenericResponseType {
  Label: string
  Value: string
}

interface ModeloType {
  id: number
  nome: string
  marca_id: number
}

async function insertMarcas(marcasRequest: GenericResponseType[]) {
  const marcasMap = marcasRequest?.map((marca) => {
    return {
      nome: marca.Label,
      id: Number(marca.Value),
    }
  })

  await db
    .insert(marcas)
    .values(marcasMap)
    .onDuplicateKeyUpdate({ set: { id: sql`id` } })

  return marcasMap.length
}

async function insertModelos(
  marcaResquest: GenericResponseType[],
  tabelaReferencia: string,
) {
  const modelosMapResponse = [] as ModeloType[]

  for (let i = 0; i < marcaResquest?.length; i++) {
    const modelosResponse = await fetch(
      `${ENDPOINT}/ConsultarModelos?codigoTabelaReferencia=${tabelaReferencia}&codigoTipoVeiculo=1&codigoMarca=${marcaResquest[i].Value}`,
      { method: 'post' },
    ).then((response) => response.json())

    modelosResponse?.Modelos?.flatMap((modelo: GenericResponseType) => {
      const model = {
        id: Number(modelo.Value),
        nome: modelo.Label,
        marca_id: Number(marcaResquest[i].Value),
      }
      modelosMapResponse.push(model)

      return model
    })
  }

  await db
    .insert(modelos)
    .values(modelosMapResponse)
    .onDuplicateKeyUpdate({ set: { id: sql`id` } })

  return modelosMapResponse.length
}
