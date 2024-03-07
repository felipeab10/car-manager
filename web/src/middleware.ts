import { NextAuthMiddlewareOptions, withAuth } from 'next-auth/middleware'
import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'

interface RouteProps {
  path: string
  permissao: string
}

const paths: RouteProps[] = [
  { path: '/api/usuarios', permissao: 'api_listar_usuarios' },
  { path: '/', permissao: 'api_listar_usuarios' },
  { path: '/api/usuarios/[id]', permissao: 'api_visualizar_usuarios' },
]

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.SECRET,
  })

  const pathname = request.nextUrl.pathname

  const path = paths.find((path) => {
    if (path.path.includes('[id]')) {
      const regex = new RegExp(`^${path.path.replace('[id]', '\\w+')}$`)

      return regex.test(pathname)
    }
    return path.path === pathname
  })

  if (!token && path?.path) {
    const url = new URL(`/auth/login`, request.url)
    return NextResponse.redirect(url)
  }

  if (token) {
    const path = paths.find((path) => {
      if (path.path.includes('[id]')) {
        const regex = new RegExp(`^${path.path.replace('[id]', '\\w+')}$`)

        return regex.test(pathname)
      }
      return path.path === pathname
    })

    const userPermissions = token.permissoes || []

    const hasPermission = userPermissions.find(
      (permissao) => permissao.nome === path?.permissao,
    )

    if (!hasPermission && !pathname.includes('/api')) {
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
