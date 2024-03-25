import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IoMenu } from 'react-icons/io5'
import { Profile } from '../Profile'

export function MobileTopBar() {
  return (
    <>
      <div className="flex gap-2 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="bg-zinc-800  h-[30px] w-[30px]"
          >
            <Button
              variant="link"
              className="text-zinc-100 p-0 outline-none focus:border-none decoration-0 "
            >
              <IoMenu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-zinc-800 text-zinc-100 border-none p-4 mt-4 ml-4">
            <DropdownMenuItem>teste</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div>
          {' '}
          <span className="text-red-500 font-bold text-lg">C</span>
          <span>-Manager</span>
        </div>
      </div>
      <Profile />
    </>
  )
}
