import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  //TODO: Remove this once we have a proper image hosting solution
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'supabase.com',
      },
    ],
  },
};

export default nextConfig;
