import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  images: {
    remotePatterns: [ new URL('https://res.cloudinary.com/**')],
  },
};

export default nextConfig;
