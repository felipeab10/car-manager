'use client'

import { CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { REGEXP_ONLY_DIGITS } from 'input-otp'

import AuthLayout from '@/app/layouts/authLayout'
import { useConfirmation } from './hooks/useConfirmation'

export default function Confirmation() {
  const { email, setActiveToken, send, validarEmail } = useConfirmation()

  return (
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

                <span className="text-sm text-zinc-400 ">Aguarde 1 minuto</span>
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
  )
}
