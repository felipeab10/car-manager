import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { getUserAccount } from '../actions/users/getUserAccount'

interface marcaType {
  id: number
  nome: string
}
interface modeloType {
  id: number
  nome: string
}
export interface CarroType {
  ano: string | null
  combustivel: string | null
  cor: string | null
  created_at: Date
  id: number
  marca_id: number
  modelo_id: number
  placa: string
  quantidade_portas: string | null
  renavam: string | null
  marca: marcaType
  modelo: modeloType
  image: string | null
}
export interface UserType {
  email: string
  nome: string
  imagem_profile?: string | null
  carros: CarroType[]
}

export function useUser() {
  const [user, setUser] = useState({} as UserType)

  const { data } = useSession()

  async function getUser(email: string) {
    const response = await getUserAccount(email)
    setUser(response)
  }

  useEffect(() => {
    if (data?.user.email) {
      getUser(data?.user.email)
    }
  }, [data?.user.email])

  return { user }
}
