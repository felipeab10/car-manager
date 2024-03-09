import Image from 'next/image'
import { ReactNode } from 'react'
import Hero from '@/assets/hero.jpg'
interface AuthLayoutProps {
  children: ReactNode
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex items-stretch h-screen overflow-hidden">
      <div className="hidden tablet:flex tablet:flex-col tablet:h-screen tablet:w-full ">
        <div className="flex bg-zinc-950 w-full h-full"></div>
        <div className="flex  w-full h-[80%] p-2 bg-zinc-950">
          <Image
            className="rounded-lg"
            alt="imagem de capa"
            src={Hero}
            placeholder="blur"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
        <div className="flex bg-zinc-950 w-full  h-full"></div>
      </div>

      {children}
    </div>
  )
}
