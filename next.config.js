/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BASE_API_URL:'http://localhost:8000/api/v2/pages/'
  },
}

module.exports = nextConfig
