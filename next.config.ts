import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.wematchnow.com',
      },
      {
        protocol: 'https',
        hostname: 's3.ap-south-1.amazonaws.com',
      }
    ]
  }
};

export default nextConfig;
