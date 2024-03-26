import { SendConfirmationAccount } from '@/app/actions/emails/sendConfirmationAccount'
import { ConfirmeAccountAction } from '@/app/actions/users/confirmeAccount'
import { useToast } from '@/components/ui/use-toast'
import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export function useConfirmation() {
  const [activeToken, setActiveToken] = useState('')
  const { toast } = useToast()

  const router = useRouter()
  const searchParams = useSearchParams()

  const email = searchParams.get('email')

  const send = useCallback(async () => {
    if (!email) return

    const result = await SendConfirmationAccount({
      to: email,
      subject: 'Verificação de E-mail | Car-Manager',
    })

    if (!result) {
      router.push('/login')
    }
  }, [email, router])

  const validarEmail = async () => {
    if (!activeToken && activeToken.length < 6) return

    const result = await ConfirmeAccountAction(activeToken)

    if (result) {
      toast({
        title: 'Sucesso!',
        description: 'Email válidado',
      })

      router.push('/login')
    }
  }

  useEffect(() => {
    if (!email) {
      router.push('/login')
    }
    send()
  }, [email, router, send])

  return { email, setActiveToken, send, validarEmail }
}
