/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['randomuser.me'], // サンプル画像のドメインを許可
  }
}

module.exports = nextConfig
