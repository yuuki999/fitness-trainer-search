/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['randomuser.me'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '54321',
        pathname: '/storage/v1/object/public/trainer/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '54321',
        pathname: '/storage/v1/object/public/trainer/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      }
    ]
  }
}

module.exports = nextConfig
