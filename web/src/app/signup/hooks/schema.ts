import { z } from 'zod'

export const RegisterSchema = z
  .object({
    nome: z.string().nonempty('Campo Obrigatório'),
    email: z.string().nonempty('Campo Obrigatório'),
    password: z
      .string()
      .min(8, 'Necessario ter ao menos 8 caracteres')
      .nonempty('Campo Obrigatório'),
    confirmed_password: z
      .string()
      .min(8, 'Necessario ter ao menos 8 caracteres'),
  })
  .refine(
    // eslint-disable-next-line camelcase
    ({ password, confirmed_password }) => password === confirmed_password,
    {
      message: 'A senha não confere',
      path: ['confirmed_password'],
    },
  )

export type RegisterSchemaType = z.infer<typeof RegisterSchema>
