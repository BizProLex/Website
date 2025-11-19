/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  basePath: '',
  assetPrefix: '',
  distDir: 'docs',
  images: {
    unoptimized: true
  }
};

module.exports = nextConfig;
