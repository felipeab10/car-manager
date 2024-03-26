import Link from 'next/link'

export default function Forbidden() {
  return (
    <div className="flex flex-col w-screen p-8 gap-4 h-screen  items-center bg-zinc-950 text-zinc-300">
      <div className="flex items-center p-8">
        <span className="text-red-900 font-bold text-2xl">C</span>
        <span>-Manager</span>
      </div>
      <div className="flex flex-col w-full h-full  items-center gap-8">
        <h1 className="font-bold text-8xl">403</h1>
        <span className=" text-xl">
          Você não possui permissão para acessar essa página, retorne para o
          <Link href="/dashboard" className="text-bold text-xl text-red-500">
            {' '}
            Dashboard.
          </Link>
        </span>
      </div>
    </div>
  )
}
