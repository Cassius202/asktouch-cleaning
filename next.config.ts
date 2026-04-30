import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: '/book-now',
        destination: '/book',
        permanent: true, // 301 redirect - good for SEO
      },
      {
        source: '/booknow',
        destination: '/book',
        permanent: true,
      },
      // Optional: Handle case-insensitive or with trailing slash
      {
        source: '/book-now/',
        destination: '/book',
        permanent: true,
      },
      {
        source: '/booknow/',
        destination: '/book',
        permanent: true,
      },
      {
        source: '/booking',
        destination: '/book',
        permanent: true,
      },
    ];
  },
  // next.config.ts
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'nsqgfrsugkvsftnffeno.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;
