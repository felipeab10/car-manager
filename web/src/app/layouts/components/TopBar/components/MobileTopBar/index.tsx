import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IoClose, IoMenu } from 'react-icons/io5'
import { Profile } from '../Profile'
import { useState } from 'react'
import { MenuLinks } from '../MenuLinks'
import { MiniLogo } from '../../../miniLogo'

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
            <MenuLinks />
          </DropdownMenuContent>
        </DropdownMenu>
        <MiniLogo />
      </div>
      <Profile />
    </>
  )
}
