'use client'
import { ReactNode } from 'react'
import { TopBar } from './components/TopBar'
import { SideBar } from './components/SideBar'
import { Footer } from './components/Footer'

interface AppLayoutProps {
  children: ReactNode
}
export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col w-full h-screen bg-[#121214]  text-zinc-100">
      <div className="flex bg-[#1A1A1E] h-[64px] p-4 border-b border-b-zinc-800">
        <TopBar />
      </div>

      <div className="flex gap-1 h-full ">
        <SideBar />
        <div className="flex flex-col bg-[#121214] w-full p-4">{children}</div>
      </div>

      <div className="flex h-[64px] bg-[#121214] p-4 border-t border-t-zinc-800">
        <Footer />
      </div>
    </div>
  )
}
