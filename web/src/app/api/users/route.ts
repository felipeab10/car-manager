import { db } from '@/db'
import { users } from '@/db/schema'
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
