'use client'

import { AppLayout } from '../layouts/appLayout'
import { useUser } from '../hooks/useUser'

import { Car } from './components/Car'

export default function Dashboard() {
  const { user } = useUser()
  console.log(user)
  return (
    <AppLayout>
      <div className="flex w-full h-full flex-col gap-4">
        <span className="text-bold text-lg text-zinc-300">Meus carros</span>
        {user?.carros?.map((carro) => <Car key={carro.id} carro={carro} />)}
      </div>
    </AppLayout>
  )
}
