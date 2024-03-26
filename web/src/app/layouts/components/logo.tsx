import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/dashboard">
      <span className="text-red-500 font-bold text-3xl">C</span>
      <span className="text-zinc-500 font-bold text-2xl">-Manager</span>
    </Link>
  )
}
