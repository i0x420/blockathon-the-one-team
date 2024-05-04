/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  output: "standalone",
  experimental: {
    esmExternals: false,
  },
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/",
      },
    ];
  },
};

module.exports = nextConfig;
