import Link from 'next/link'

export default function Forbidden() {
  return (
    <div className="w-full flex items-center gap-8 flex-col h-screen justify-center bg-zinc-950 text-zinc-300">
      <h1 className="font-bold text-8xl">403</h1>
      <span className=" text-xl">
        Você não possui permissão para acessar essa página, retorne para o
        <Link href="/"> dashboard.</Link>
      </span>
    </div>
  )
}
