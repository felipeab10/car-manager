import { useToast } from '@/components/ui/use-toast'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function useLogin() {
  const router = useRouter()

  const { data } = useSession()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { toast } = useToast()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

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

      if (response?.error === 'USER_NOT_FOUND') {
        toast({
          title: 'Ops!',
          description: 'Usuário não encontrado!',
        })
      }
    } catch (error) {
      console.log('[LOGIN_ERROR]: ', error)
    }
  }

  useEffect(() => {
    if (data?.user.email) {
      router.push('/')
    }
  }, [router, data?.user.email])

  return {
    setEmail,
    setPassword,
    handleLogin,
  }
}
