/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  basePath: '',
  assetPrefix: '',
  distDir: 'out',
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
