import { ReactNode } from 'react'

interface AppLayoutProps {
  children: ReactNode
}
export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col w-full h-screen bg-zinc-950 text-zinc-100">
      <div className="flex bg-blue-300 h-[64px] p-4">topbar</div>
      <div className="flex gap-1 h-full">
        <div className="flex flex-col w-full max-w-[279px] bg-red-500 h-full p-4">
          leftBar
        </div>
        <div className="flex flex-col bg-green-300 w-full p-4">{children}</div>
      </div>
      <div className="flex h-[64px] bg-yellow-200 p-4">footer</div>
    </div>
  )
}
