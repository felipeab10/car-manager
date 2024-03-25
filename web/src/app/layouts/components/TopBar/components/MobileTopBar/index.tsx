import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IoClose, IoMenu, IoCarSportSharp, IoHome } from 'react-icons/io5'
import { Profile } from '../Profile'
import { useState } from 'react'
import Link from 'next/link'

export function MobileTopBar() {
  const [menuActive, setMenuActive] = useState(false)

  return (
    <>
      <div className="flex gap-2 items-center">
        <DropdownMenu
          open={menuActive}
          onOpenChange={() => setMenuActive(!menuActive)}
        >
          <DropdownMenuTrigger
            onClick={() => setMenuActive(!menuActive)}
            asChild
            className="bg-zinc-800  h-[30px] w-[30px]"
          >
            <Button
              variant="link"
              className="text-zinc-100 p-0 outline-none focus:border-none decoration-0 "
            >
              {!menuActive ? <IoMenu /> : <IoClose />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-zinc-800 text-zinc-100 border-none p-4 mt-6 ml-4">
            <div className="flex flex-col gap-6">
              <Link href="/dashboard" className="flex gap-4 items-center">
                <IoHome className="text-red-800 w-[30px] h-[30px]" />
                <span>Home</span>
              </Link>
              <Link href="/meus-carros" className="flex gap-4 items-center">
                <IoCarSportSharp className="text-red-800 w-[30px] h-[30px]" />
                <span>Meus Carros</span>
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <div>
          <span className="text-red-500 font-bold text-lg">C</span>
          <span>-Manager</span>
        </div>
      </div>
      <Profile />
    </>
  )
}
