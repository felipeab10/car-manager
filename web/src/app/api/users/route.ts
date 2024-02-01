import { db } from '@/db/db'

import { users } from '@/db/schemas/usuario'
import { NextResponse } from 'next/server'

export async function GET() {
  const teste = await db.select().from(users)
  return NextResponse.json(teste)
}

export async function POST() {
  return NextResponse.json({})
}

export async function PUT() {
  return NextResponse.json({})
}

export async function DELETE() {
  return NextResponse.json({})
}
