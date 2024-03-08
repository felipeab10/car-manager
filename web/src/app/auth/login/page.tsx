'use client'

import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import Hero from '@/assets/hero.jpg'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FaCarSide } from 'react-icons/fa'
import { FormLogin } from './components/FormLogin'
import { useLogin } from './hooks/useLogin'

export default function Login() {
  const { handleLogin, setEmail, setPassword } = useLogin()

  return (
    <div className="w-full flex justify-between h-screen  bg-zinc-900 text-zinc-100">
      <div className="hidden tablet:flex tablet:flex-col tablet:h-screen tablet:w-full ">
        <div className="flex bg-zinc-950 w-full h-full"></div>
        <div className="flex  w-full h-[80%] p-2 bg-zinc-950">
          <Image
            className="rounded-lg"
            alt="imagem de capa"
            src={Hero}
            placeholder="blur"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <div className="flex bg-zinc-950 w-full  h-full"></div>
      </div>

      <Card className="tablet:min-w-[800px] flex-1 tablet:flex-initial rounded-none bg-zinc-900 text-zinc-100 border-none  tablet:flex tablet:flex-col tablet:p-20  ">
        <div className="flex w-full items-center flex-1 justify-center">
          <div className="flex flex-col w-full max-w-[450px]">
            <CardHeader className="flex flex-col  gap-9 ">
              <span className="text-4xl">Car Manager</span>
              <span className="text-2xl">Acesse sua conta</span>
            </CardHeader>

            <FormLogin setEmail={setEmail} setPassword={setPassword} />

            <CardFooter className="flex flex-col gap-10 ">
              <Button
                onClick={handleLogin}
                className="bg-red-600 w-full h-[48px] hover:bg-red-500"
              >
                Entrar
              </Button>

              <Separator className="bg-zinc-600" />

              <Link
                href="#"
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
    </div>
  )
}
