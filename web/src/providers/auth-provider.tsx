'use client'

import { SessionProvider, SessionProviderProps } from 'next-auth/react'

interface AuthProviderProps extends SessionProviderProps {
  children: React.ReactNode
}

export const AuthProvider = ({ children, session }: AuthProviderProps) => {
  return <SessionProvider session={session}>{children}</SessionProvider>
}
