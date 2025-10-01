/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "standalone",
  basePath: isProd ? "/final" : "",
  assetPrefix: isProd ? "/final/" : "",
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
