export interface RouteProps {
  path: string
  permissao: string
}

export const privatePaths: RouteProps[] = [
  { path: '/api/usuarios', permissao: 'api_listar_usuarios' },
  { path: '/api/modelos', permissao: 'api_listar_modelos' },
  { path: '/api/usuarios/[id]', permissao: 'api_visualizar_usuarios' },
]

export const publicPaths = ['/api', '/', '/login', '/signup']
