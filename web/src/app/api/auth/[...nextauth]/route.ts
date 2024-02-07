import { db } from '@/db'
import { DrizzleAdapter } from '@/lib/drizzle-adapter'

import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialProvider from 'next-auth/providers/credentials'

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
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
        const user = {
          id: '1',
          email: 'user@email.com',
          password: '123',
          name: 'User Hardcoded',
          role: 'admin',
        }

        const isValidEmail = user.email === credentials?.email
        const isValidPassword = user.password === credentials?.password

        if (!isValidEmail || !isValidPassword) {
          return null
        }

        return user
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      const customUser = user as unknown as any

      if (user) {
        return {
          ...token,
          role: customUser.role,
        }
      }

      return token
    },
    session: async ({ session, token }) => {
      console.log(session)
      return {
        ...session,
        user: {
          name: token.name,
          email: token.email,
          role: token.role,
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