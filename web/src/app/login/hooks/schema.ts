import { z } from 'zod'

export const LoginSchema = z.object({
  email: z.string().nonempty('Campo Obrigatório'),
  password: z
    .string()
    .min(8, 'Necessario ter ao menos 8 caracteres')
    .nonempty('Campo Obrigatório'),
})

export type LoginSchemaType = z.infer<typeof LoginSchema>
