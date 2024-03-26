import Image from 'next/image'
import { ReactNode } from 'react'
import Hero from '@/assets/hero.jpg'
import { Card } from '@/components/ui/card'
import { useMobile } from '../hooks/useMobile'
interface AuthLayoutProps {
  children: ReactNode
}
export default function AuthLayout({ children }: AuthLayoutProps) {
  const { isMobile } = useMobile()

  return (
    <div className="flex items-stretch h-screen overflow-hidden">
      <div
        className={` ${isMobile() ? 'hidden' : 'flex flex-col h-screen w-full'}`}
      >
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

      <Card
        className={`h-full flex-1  overflow-auto rounded-none bg-zinc-900 text-zinc-100 border-none  ${isMobile() ? '' : '  flex flex-col min-w-[560px] flex-initial  '}`}
      >
        <div className="flex h-[100dvh] max-[1100px]:h-auto max-[1100px]:min-h-[calc(100dvh-16px)] max-[1100px]:p-7  w-full items-center flex-1  justify-center pt-16">
          {children}
        </div>
      </Card>
    </div>
  )
}
