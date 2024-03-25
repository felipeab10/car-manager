import { CarroType } from '@/app/hooks/useUser'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Image from 'next/image'
import CarProfile from '@/assets/car-profile.jpg'
import Link from 'next/link'

interface CarPros {
  carro: CarroType
}

export function Car({ carro }: CarPros) {
  return (
    <Card className="bg-zinc-900 text-zinc-200 border-zinc-800 ">
      <CardHeader>
        <Link href="#" className="font-bold text-zinc-300 self-end">
          Editar
        </Link>
        <Image
          color="bg-zinc-900"
          className="bg-zinc-900 filter hue-rotate-50  "
          src={carro.image ?? CarProfile}
          alt="imagem do carro"
        />

        <CardTitle className="font-bold text-lg">{carro.modelo.nome}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <div className="flex gap-2 text-zinc-300">
          <span className="font-bold">Marca:</span>
          <span>{carro.marca.nome}</span>
        </div>

        <div className="flex gap-2 text-zinc-300">
          <span className="font-bold">Ano:</span>
          <span>{carro.ano}</span>
        </div>

        <div className="flex gap-2 text-zinc-300">
          <span className="font-bold">Cor:</span>
          <span>{carro.cor}</span>
        </div>

        <div className="flex gap-2 text-zinc-300">
          <span className="font-bold">Quantidade de portas:</span>
          <span>{carro.quantidade_portas}</span>
        </div>

        <div className="flex gap-2 text-zinc-300">
          <span className="font-bold">Combustível:</span>
          <span>{carro.combustivel}</span>
        </div>

        <div className="flex gap-2 text-zinc-300">
          <span className="font-bold">Placa:</span>
          <span>{carro.placa}</span>
        </div>

        <div className="flex gap-2 text-zinc-300">
          <span className="font-bold">Renavam:</span>
          <span>{carro.renavam}</span>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-4 pt-2">
          <Link
            className="bg-zinc-800 p-4 rounded-md hover:bg-zinc-700 cursor-pointer"
            href="#"
          >
            Ordens de serviços
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
