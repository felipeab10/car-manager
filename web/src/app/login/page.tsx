'use client'

import { Card, CardFooter, CardHeader } from '@/components/ui/card'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FaCarSide } from 'react-icons/fa'
import { FormLogin } from './components/FormLogin'
import { useLogin } from './hooks/useLogin'
import AuthLayout from '../authLayout'
import { FormProvider } from 'react-hook-form'

export default function Login() {
  const { handleLogin, methods } = useLogin()

  return (
    <AuthLayout>
      <Card className="tablet:min-w-[560px] flex-1 tablet:flex-initial overflow-auto rounded-none bg-zinc-900 text-zinc-100 border-none  tablet:flex tablet:flex-col ">
        <div className="flex h-[100dvh] max-[1100px]:h-auto max-[1100px]:min-h-[calc(100dvh-16px)] max-[1100px]:p-7  w-full items-center flex-1 justify-center">
          <div className="flex flex-col w-full max-w-[450px]">
            <CardHeader className="flex flex-col  gap-9 ">
              <span className="text-4xl">Car Manager</span>
              <span className="text-2xl">Acesse sua conta</span>
            </CardHeader>

            <FormProvider {...methods}>
              <FormLogin />
            </FormProvider>

            <CardFooter className="flex flex-col gap-10 ">
              <Button
                onClick={handleLogin}
                className="bg-red-600 w-full h-[48px] hover:bg-red-500"
              >
                Entrar
              </Button>

              <Separator className="bg-zinc-600" />

              <Link
                href="signup"
                className="flex  bg-zinc-800 w-full p-6 rounded-2xl gap-3  hover:bg-zinc-700"
              >
                <FaCarSide className="text-red-500 w-[24px] h-[24px]" />

                <div className="flex flex-col">
                  <span className="text-zinc-300">Não tem uma conta?</span>
                  <span className=" text-red-600 hover:text-red-500">
                    Se inscreva gratuitamente
                  </span>
                </div>
              </Link>
            </CardFooter>
          </div>
        </div>
      </Card>
    </AuthLayout>
  )
}
