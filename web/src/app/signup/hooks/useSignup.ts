'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterSchema, RegisterSchemaType } from './schema'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

import { CreateUserAction } from '@/app/actions/users/create'
import { signIn } from 'next-auth/react'

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

    const response = await CreateUserAction(params)

    if (response?.error && response?.message === 'USER_ALREADY_CREATED') {
      toast({
        title: 'Ops!',
        description: 'Esse email já esta cadastrado!',
      })
    }

    const loginResponse = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (!loginResponse?.error) {
      router.refresh()
      router.push('/')
    }
  })

  return {
    create,
    methods,
  }
}
