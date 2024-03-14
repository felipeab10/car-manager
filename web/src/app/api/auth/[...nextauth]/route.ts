import { authenticate } from '@/lib/authenticate'
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialProvider from 'next-auth/providers/credentials'

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 4, // 4 horas
  },
  // useSecureCookies: true,
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },

    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },

    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
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
      if (user) {
        token = { ...token, ...user }
      }

      return token
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...token,
        },
      }
    },
  },
  pages: {
    signIn: '/login',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
