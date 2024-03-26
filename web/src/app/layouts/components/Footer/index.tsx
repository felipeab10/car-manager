import { useMobile } from '@/app/hooks/useMobile'
import { MiniLogo } from '../miniLogo'

export function Footer() {
  const { isMobile } = useMobile()

  if (isMobile()) {
    return (
      <div className="flex gap-2 w-full items-center justify-center">
        <span className="text-zinc-300">Desenvolvido por</span>
        <a
          target="_blank"
          className="text-red-500 font-bold"
          href="https://github.com/felipeab10"
        >
          Felipe Almeida batista.
        </a>
      </div>
    )
  }

  return (
    <div className="flex w-full items-center justify-center gap-2">
      <MiniLogo />
      <span className="text-zinc-300">
        é um projeto opensource desenvolvido por
      </span>
      <a
        target="_blank"
        className="text-red-500 font-bold"
        href="https://github.com/felipeab10"
      >
        Felipe Almeida batista.
      </a>
    </div>
  )
}
