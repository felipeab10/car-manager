import { db } from '@/db/db'
import { users } from '@/db/schemas/usuario'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const teste = await db.select().from(users)
  return NextResponse.json(teste)
}

export async function POST(request: NextRequest) {
  return NextResponse.json({})
}

export async function PUT(request: NextRequest) {
  return NextResponse.json({})
}

export async function DELETE(request: NextRequest) {
  return NextResponse.json({})
}
