import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'

interface FormLoginProps {
  setEmail: Dispatch<SetStateAction<string>>
  setPassword: Dispatch<SetStateAction<string>>
}
export function FormLogin({ setEmail, setPassword }: FormLoginProps) {
  return (
    <CardContent className="flex flex-col  gap-6 mt-6 ">
      <div className="flex flex-col gap-3">
        <Label className="text-zinc-300 font-light">E-mail</Label>
        <Input
          className="h-[48px]"
          type="email"
          placeholder="Seu e-mail"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label className="text-zinc-300 font-light">Senha</Label>
        <Input
          className="h-[48px]"
          type="password"
          placeholder="Sua senha"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link href="#" className="text-sm text-red-600 hover:text-red-500">
          Esqueci minha senha
        </Link>
      </div>
    </CardContent>
  )
}
