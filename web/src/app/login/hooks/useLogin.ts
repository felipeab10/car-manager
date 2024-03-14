import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { LoginSchema, LoginSchemaType } from './schema'

export function useLogin() {
  const methods = useForm<LoginSchemaType>({
    criteriaMode: 'all',
    mode: 'all',
    resolver: zodResolver(LoginSchema),
  })

  const { watch, handleSubmit } = methods
  const { email, password } = watch()

  const router = useRouter()

  const { data } = useSession()

  const { toast } = useToast()

  const handleLogin: () => void = handleSubmit(async () => {
    try {
      const response = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (!response?.error) {
        router.refresh()
        router.push('/')
      }

      if (response?.error?.includes('connect')) {
        toast({
          title: 'Ops!',
          description: 'Erro ao conectar ao banco de dados!',
        })
      }

      if (response?.error === 'INVALID_CREDENTIALS') {
        toast({
          title: 'Ops!',
          description: 'Email ou senha inválidos',
        })
      }

      if (response?.error === 'USER_NOT_ACTIVE') {
        toast({
          title: 'Ops!',
          description: 'Email não está ativado',
        })

        router.push(`/signup/confirmation?email=${email}`)
      }

      if (response?.error === 'USER_NOT_FOUND') {
        toast({
          title: 'Ops!',
          description: 'Usuário não encontrado!',
        })
      }
    } catch (error) {
      console.log('[LOGIN_ERROR]: ', error)
    }
  })

  useEffect(() => {
    if (data?.user.email) {
      router.push('/')
    }
  }, [router, data?.user.email])

  return {
    handleLogin,
    methods,
  }
}
