import { authenticate } from '@/lib/authenticate'
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialProvider from 'next-auth/providers/credentials'

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        return await authenticate({
          email: credentials?.email,
          password: credentials?.password,
        })
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      // const customUser = user as unknown as any
      if (user) {
        return {
          ...token,
        }
      }
      return token
    },
    session: async ({ session, token }) => {
      // console.log(session)
      return {
        ...session,
        user: {
          name: token.name,
          email: token.email,
        },
      }
    },
  },
  pages: {
    signIn: '/auth/login',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
