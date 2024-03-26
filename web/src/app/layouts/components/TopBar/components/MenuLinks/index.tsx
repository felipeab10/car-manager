import { IoCarSportSharp, IoHome } from 'react-icons/io5'
import { MenuLink } from './components/MenuLink'

export function MenuLinks() {
  return (
    <div className="flex flex-col gap-4">
      <MenuLink Icon={IoHome} href="/dashboard" label="Home" />

      <MenuLink
        Icon={IoCarSportSharp}
        href="/meus-carros"
        label="Meus Carros"
      />
    </div>
  )
}
