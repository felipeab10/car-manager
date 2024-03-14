'use client'
import { useSearchParams, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState, Suspense } from 'react'
import { CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { REGEXP_ONLY_DIGITS } from 'input-otp'
import AuthLayout from '@/app/authLayout'
import { SendConfirmationAccount } from '@/app/actions/emails/sendConfirmationAccount'
import { ConfirmeAccountAction } from '@/app/actions/users/confirmeAccount'
import { useToast } from '@/components/ui/use-toast'

export default function Confirmation() {
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

  return (
    <Suspense>
      <AuthLayout>
        <form className="flex h-full">
          <div className="flex flex-col w-full max-w-[450px] flex-1 h-full  ">
            <CardHeader className="flex flex-col  gap-9 ">
              <span className="text-4xl">Car Manager</span>
              <span className="text-2xl">Verifique o seu e-mail</span>
            </CardHeader>

            <CardContent className="flex flex-col gap-4 pt-6">
              <span className="text-zinc-300 font-light">
                Enviamos um código de verificação para {email}
              </span>

              <div className="flex flex-col gap-4 ">
                <span className="text-zinc-200 font-medium">
                  Insira o código enviado para seu e-mail.
                </span>

                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  onChange={(event) => setActiveToken(event)}
                  render={({ slots }) => (
                    <InputOTPGroup>
                      {slots.map((slot, index) => (
                        <InputOTPSlot
                          className=" bg-zinc-950 mr-2 h-[60px]"
                          key={index}
                          {...slot}
                        />
                      ))}{' '}
                    </InputOTPGroup>
                  )}
                />
                <div className="flex gap-2 items-center">
                  <Button
                    className="text-red-500 hover:text-red-400 p-0"
                    type="button"
                    onClick={send}
                  >
                    Enviar novamente
                  </Button>

                  <span className="text-sm text-zinc-400 ">
                    Aguarde 1 minuto
                  </span>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-10 ">
              <Button
                type="button"
                onClick={validarEmail}
                className="bg-red-600 w-full h-[48px] hover:bg-red-500"
              >
                Verificar meu e-mail
              </Button>
            </CardFooter>
          </div>
        </form>
      </AuthLayout>
    </Suspense>
  )
}
