import { db } from '@/db'
import { users } from '@/db/schema'
import bcrypt from 'bcrypt'
import { eq, getTableColumns } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const insertUserSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
})

export async function GET() {
  const { password, ...rest } = getTableColumns(users)

  const teste = await db.select(rest).from(users)
  return NextResponse.json(teste)
}

export async function POST(request: NextRequest) {
  const params = await request.json()

  const formValidate = insertUserSchema.safeParse(params)

  if (!formValidate.success) {
    console.log(formValidate)

    const errors = formValidate.error.formErrors

    return NextResponse.json(
      { error: { message: 'Invalid request', errors } },
      { status: 400 },
    )
  }

  const userExist = await db.query.users.findFirst({
    where: eq(users.email, params.email),
  })

  if (userExist) {
    return NextResponse.json(
      { message: 'Usuário já cadastrado.' },
      { status: 422 },
    )
  }

  try {
    const hashedPassword = await bcrypt.hash(params.password, 10)

    await db.insert(users).values({ ...params, password: hashedPassword })

    console.log('teta', hashedPassword)
    return NextResponse.json({ status: 'Success' }, { status: 201 })
  } catch (error) {}
}

export async function PUT() {
  return NextResponse.json({})
}

export async function DELETE() {
  return NextResponse.json({})
}
