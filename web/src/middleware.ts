import { NextAuthMiddlewareOptions, withAuth } from 'next-auth/middleware'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import { privatePaths, publicPaths } from './routes'

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.SECRET,
  })

  const pathname = request.nextUrl.pathname

  const path = privatePaths.find((path) => {
    if (path.path.includes('[id]')) {
      const regex = new RegExp(`^${path.path.replace('[id]', '\\w+')}$`)

      return regex.test(pathname)
    }
    return path.path === pathname
  })

  if (!token && path?.path) {
    const url = new URL(`/`, request.url)
    return NextResponse.redirect(url)
  }

  if (token) {
    const userPermissions = token.permissoes || []

    const hasPermission = userPermissions.find(
      (permissao) => permissao.nome === path?.permissao,
    )

    if (!hasPermission && !publicPaths.some((path) => path)) {
      const url = new URL(`/auth/403`, request.url)
      return NextResponse.rewrite(url)
    }

    if (!hasPermission && pathname.includes('/api')) {
      return NextResponse.json({
        shortMessage: 'ACESSONEGADO',
        message: 'Seu usuário não possui permissao',
      })
    }
  }
}

const callbackOptions: NextAuthMiddlewareOptions = {}

export default withAuth(middleware, callbackOptions)

export const config = {
  matcher: [
    '/((?!auth/login|auth/register|auth/403|api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}
