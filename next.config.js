/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.ygoprodeck.com'],
  },
}

module.exports = nextConfig
