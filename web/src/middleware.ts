import { NextAuthMiddlewareOptions, withAuth } from 'next-auth/middleware'

const middleware = () => {
  // request: NextRequestWithAuth
  console.log('teste1')
  // const isPrivateRoutes = request.nextUrl.pathname.startsWith('/api/marcas')
  // if (isPrivateRoutes) {
  //   return NextResponse.json('teta')
  // }
}

const callbackOptions: NextAuthMiddlewareOptions = {}

export default withAuth(middleware, callbackOptions)

export const config = {
  matcher: [
    '/((?!auth/login|auth/register|_next/static|_next/image|favicon.ico).*)',
  ],
  // matcher: ['/api/:path*'],
}
