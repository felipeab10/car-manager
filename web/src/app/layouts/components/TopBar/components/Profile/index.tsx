import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { PiGearSixFill } from 'react-icons/pi'
import { TbLogout } from 'react-icons/tb'
import { signOut } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'

export function Profile() {
  return (
    <div className="flex mr-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="bg-zinc-800  h-[25px] w-[25px]">
          <Button
            variant="link"
            className="text-zinc-100 p-0 outline-none focus:border-none decoration-0 "
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="min-w-[360px] bg-zinc-800 text-zinc-100 border border-zinc-700 mt-6 mr-4">
          <div className="flex flex-col w-full  pb-4">
            <div className="flex gap-4 p-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-bold">Felipe Almeida Batista</span>
                <span className="text-sm">felipeab10@hotmail.com</span>
              </div>
            </div>
            <Separator className="bg-zinc-700" />
            <Link href="#" className="flex p-4 gap-4 items-center">
              <PiGearSixFill className="text-red-400 w-[30px] h-[30px]" />
              <div className="flex flex-col">
                <span className="font-bold">Minha Conta</span>
                <span className="text-zinc-400 text-sm">
                  Gerencia Dados e preferências
                </span>
              </div>
            </Link>
            <Separator className="bg-zinc-700" />
            <div className="flex pt-4 pl-4 w-full   ">
              <Button
                onClick={() => signOut()}
                variant="ghost"
                type="button"
                className="p-0 m-0 flex gap-4"
              >
                <TbLogout className="text-red-800 w-[30px] h-[30px]" />
                <span className="text-red-800 font-bold">Sair da conta</span>
              </Button>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
