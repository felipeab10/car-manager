'use client'

import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import AuthLayout from '../authLayout'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { RiLoginBoxLine } from 'react-icons/ri'
import { FormRegister } from './components/FormRegister'
import { useSignup } from './hooks/useSignup'
import { FormProvider } from 'react-hook-form'

export default function Signup() {
  const { create, methods } = useSignup()

  return (
    <AuthLayout>
      <form action={create}>
        <Card className="tablet:min-w-[560px] h-full flex-1 tablet:flex-initial overflow-auto rounded-none bg-zinc-900 text-zinc-100 border-none  tablet:flex tablet:flex-col tablet:pt-20 tablet:pb-20">
          <div className="flex h-[100dvh] max-[1100px]:h-auto max-[1100px]:min-h-[calc(100dvh-16px)] max-[1100px]:p-7  w-full items-center flex-1 justify-center ">
            <div className="flex flex-col w-full max-w-[450px] ">
              <CardHeader className="flex flex-col  gap-9 ">
                <span className="text-4xl">Car Manager</span>
                <span className="text-2xl">Cadastre-se gratuitamente</span>
              </CardHeader>

              <FormProvider {...methods}>
                <FormRegister />
              </FormProvider>

              <CardFooter className="flex flex-col gap-10 ">
                <span>
                  Ao se cadastrar, você aceita nossos termos de uso e a nossa
                  política de privacidade.
                </span>
                <Button className="bg-red-600 w-full h-[48px] hover:bg-red-500">
                  Cadastre-se gratuitamente
                </Button>

                <Separator className="bg-zinc-600" />

                <Link
                  href="login"
                  className="flex  bg-zinc-800 w-full p-6 rounded-2xl gap-3  hover:bg-zinc-700"
                >
                  <RiLoginBoxLine className="text-red-500 w-[24px] h-[24px]" />

                  <div className="flex flex-col">
                    <span className="text-zinc-300">Já possui uma conta?</span>
                    <span className=" text-red-600 hover:text-red-500">
                      Entrar na plataforma
                    </span>
                  </div>
                </Link>
              </CardFooter>
            </div>
          </div>
        </Card>
      </form>
    </AuthLayout>
  )
}
