import Link from 'next/link'

export function MiniLogo() {
  return (
    <Link href="/dashboard">
      <span className="text-red-500 font-bold text-xl">C</span>
      <span className="text-zinc-500 font-bold text-lg">-Manager</span>
    </Link>
  )
}
