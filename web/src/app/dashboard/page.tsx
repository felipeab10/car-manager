'use client'

import { AppLayout } from '../layouts/appLayout'
import { useUser } from '../hooks/useUser'

import { Car } from './components/Car'
import { Button } from '@/components/ui/button'
import { IoCarSportSharp } from 'react-icons/io5'
import { LoadingCarCard } from './components/LoadingCarCard'

export default function Dashboard() {
  const { user, isLoading } = useUser()

  return (
    <AppLayout>
      {isLoading ? (
        <LoadingCarCard />
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <span className="text-bold text-lg text-zinc-300">Meus carros</span>
            <Button
              type="button"
              className="text-zinc-300 font-bold hover:bg-zinc-800 flex gap-2 hover:text-zinc-100 "
            >
              <IoCarSportSharp className="text-red-800 w-[30px] h-[30px]" />
              Adicionar carro
            </Button>
          </div>

          <div className="grid grid-cols-4 desktop:grid-cols-6 gap-4 h-full mobile:grid mobile:grid-cols-1 tablet:grid-cols-1">
            {user?.carros?.map((carro) => <Car key={carro.id} carro={carro} />)}
          </div>
        </div>
      )}
    </AppLayout>
  )
}
