import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { LoginSchemaType } from '../../hooks/schema'
import { useFormContext } from 'react-hook-form'

export function FormLogin() {
  const {
    register,
    formState: { errors },
  } = useFormContext<LoginSchemaType>()

  return (
    <CardContent className="flex flex-col  gap-6 mt-6 ">
      <Input
        className="h-[48px]"
        type="email"
        placeholder="Seu e-mail"
        label="E-mail"
        {...register('email')}
        errorMessage={errors.email?.message}
      />

      <div className="flex flex-col gap-3">
        <Input
          className="h-[48px]"
          type="password"
          placeholder="Sua senha"
          label="Senha"
          {...register('password')}
          errorMessage={errors.password?.message}
        />
        <Link href="#" className="text-sm text-red-600 hover:text-red-500">
          Esqueci minha senha
        </Link>
      </div>
    </CardContent>
  )
}
