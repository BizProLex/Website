/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages. Note: API routes are not supported by `next export`.
  output: 'export',
  trailingSlash: true,
};

module.exports = nextConfig;
