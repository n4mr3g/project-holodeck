/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  productionBrowserSourceMaps: false, // Disable source maps in development
  optimizeFonts: false, // Disable font optimization
  reactStrictMode: false,
  experimental: {
    serverActions: true,
  }
}

module.exports = nextConfig
