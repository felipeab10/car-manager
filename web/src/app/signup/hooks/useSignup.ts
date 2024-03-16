'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema, RegisterSchemaType } from './schema'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

import { CreateUserAction } from '@/app/actions/users/create'
import { SendConfirmationAccount } from '@/app/actions/emails/sendConfirmationAccount'

export function useSignup() {
  const { toast } = useToast()

  const methods = useForm<RegisterSchemaType>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(RegisterSchema),
  })

  const router = useRouter()

  const { handleSubmit, watch } = methods

  const { nome, email, password } = watch()

  const create: () => void = handleSubmit(async () => {
    const params = { nome, email, password }

    CreateUserAction(params).then((resp) => {
      const response = JSON.parse(resp)

      if (response?.error && response?.message === 'USER_ALREADY_CREATED') {
        toast({
          title: 'Ops!',
          description: 'Esse email já esta cadastrado!',
        })
      }

      if (!response?.error) {
        SendConfirmationAccount({
          to: email,
          subject: 'Verificação de E-mail | Car-Manager',
        })
      }

      router.push(`/signup/confirmation?email=${email}`)
    })
  })

  return {
    create,
    methods,
  }
}
