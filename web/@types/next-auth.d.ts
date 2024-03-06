import { DefaultSession } from 'next-auth'
import { PermissaoType } from './users/regras'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      permissoes: PermissaoType[]
    } & DefaultSession['user']
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    permissoes: PermissaoType[]
  }
}
