'use client'

import { useMobile } from '@/app/hooks/useMobile'
import { MenuLinks } from '../TopBar/components/MenuLinks'

export function SideBar() {
  const { isMobile } = useMobile()

  if (isMobile()) {
    return null
  }

  return (
    <div className="flex flex-col w-full max-w-[200px] bg-[#121214] flex-1 p-4 border-r border-r-zinc-800">
      <MenuLinks />
    </div>
  )
}
