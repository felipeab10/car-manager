import Link from 'next/link'
import { useEffect, useState } from 'react'
import { IconType } from 'react-icons/lib'

interface MenuLinkProps {
  href: string
  Icon: IconType
  label: string
  active?: boolean
}

export function MenuLink({ href, Icon, label }: MenuLinkProps) {
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (window.location.pathname) {
      setActive(window.location.pathname === href)
    }
  }, [href])

  const classActive = active
    ? 'bg-zinc-800 p-2 rounded-md text-zinc-200'
    : 'hover:bg-zinc-800 p-2 hover:rounded-md text-zinc-400'

  return (
    <Link href={href} className={`flex gap-4 items-center ${classActive}`}>
      <Icon className="text-red-800 w-[30px] h-[30px]" />
      <span>{label}</span>
    </Link>
  )
}
