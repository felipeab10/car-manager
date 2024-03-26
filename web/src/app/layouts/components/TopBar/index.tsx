'use client'

import { useMobile } from '@/app/hooks/useMobile'
import { MobileTopBar } from './components/MobileTopBar'
import { DesktopTopBar } from './components/DesktopTopBar'

export function TopBar() {
  const { isMobile } = useMobile()

  return (
    <div className=" flex flex-1 justify-between items-center">
      {isMobile() ? <MobileTopBar /> : <DesktopTopBar />}
    </div>
  )
}
