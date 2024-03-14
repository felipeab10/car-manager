/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'standalone',
  experimental: { esmExternals: 'loose', missingSuspenseWithCSRBailout: false },
}

export default nextConfig
