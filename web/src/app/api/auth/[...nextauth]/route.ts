import { authenticate } from '@/lib/authenticate'
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialProvider from 'next-auth/providers/credentials'

const obtenerDominio = (url: string) => {
  const dominio = new URL(url).hostname.split('.')
  return dominio
    .slice(0)
    .slice(-(dominio.length === 4 ? 3 : 2))
    .join('.')
}

const useSecureCookies = process.env.NEXTAUTH_URL?.startsWith('https://')
const cookiePrefix = useSecureCookies ? '__Secure-' : ''
const hostName = obtenerDominio(process.env.NEXTAUTH_URL ?? '')

const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 4, // 4 horas
  },
  // useSecureCookies: true,
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
        domain: hostName === 'localhost' ? hostName : '.' + hostName, // add a . in front so that subdomains are included
      },
    },

    callbackUrl: {
      name: `${cookiePrefix}next-auth.callback-url`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
        domain: hostName === 'localhost' ? hostName : '.' + hostName, // add a . in front so that subdomains are included
      },
    },

    csrfToken: {
      name: `${cookiePrefix}next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false,
        domain: hostName === 'localhost' ? hostName : '.' + hostName, // add a . in front so that subdomains are included
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
