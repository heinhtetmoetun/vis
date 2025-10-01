/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  basePath: '/final',
  assetPrefix: '/final/',
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
