'use client'
import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'
import { RegisterSchemaType } from '../../hooks/schema'

export function FormRegister() {
  const {
    register,
    formState: { errors },
  } = useFormContext<RegisterSchemaType>()

  return (
    <CardContent className="flex flex-col  gap-6 mt-6 ">
      <Input
        className="h-[48px]"
        type="text"
        placeholder="Seu nome completo"
        {...register('nome')}
        label="Nome"
        errorMessage={errors.nome?.message}
      />

      <Input
        className="h-[48px]"
        type="email"
        placeholder="Seu e-mail"
        {...register('email')}
        label="E-mail"
        errorMessage={errors.email?.message}
      />

      <Input
        className="h-[48px]"
        type="password"
        placeholder="Deve ter no mínimo 8 caracteres"
        {...register('password')}
        label="Senha"
        errorMessage={errors.password?.message}
      />

      <Input
        className="h-[48px]"
        type="password"
        placeholder="Deve ter no mínimo 8 caracteres"
        {...register('confirmed_password')}
        name="confirmed_password"
        label="Confirme sua senha"
        errorMessage={errors.confirmed_password?.message}
      />
    </CardContent>
  )
}
