/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  experimental: { esmExternals: 'loose' },
}

export default nextConfig
