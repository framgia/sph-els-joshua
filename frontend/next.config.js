/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL
  },
  images: {
    domains: [
      'i.pravatar.cc',
      'avatars.githubusercontent.com',
      'i.stack.imgur.com',
      'localhost:8000'
    ]
  }
}

module.exports = nextConfig
