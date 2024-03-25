'use client'

import { useMobile } from '@/app/hooks/useMobile'

export function SideBar() {
  const { isMobile } = useMobile()

  if (isMobile()) {
    return null
  }

  return (
    <div className="flex flex-col w-full max-w-[279px] bg-[#121214] h-full p-4 border-r border-r-zinc-800">
      desktop
    </div>
  )
}
