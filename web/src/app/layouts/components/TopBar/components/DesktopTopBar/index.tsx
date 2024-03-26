import { Logo } from '../../../logo'
import { Profile } from '../Profile'

export function DesktopTopBar() {
  return (
    <div className="flex flex-1 p-4 h-[48px] justify-between items-center">
      <Logo />
      <Profile />
    </div>
  )
}
