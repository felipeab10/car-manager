'use client'

import { useMobile } from '@/app/hooks/useMobile'
import { MobileTopBar } from './components/MobileTopBar'

export function TopBar() {
  const { isMobile } = useMobile()

  return (
    <div className=" flex w-full justify-between items-center">
      {isMobile() && <MobileTopBar />}
    </div>
  )
}
