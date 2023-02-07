/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 't.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'platform-lookaside.fbsbx.com',
      },
      {
        protocol: 'https',
        hostname: 'charts-images.scdn.co',
      },
      {
        hostname: 'seed-mix-image.spotifycdn.com',
      },
      {
        hostname: 'mosaic.scdn.co',
      },
      {
        hostname: 'seeded-session-images.scdn.co',
      },
      {
        hostname: 'thisis-images.scdn.co',
      },
    ],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
