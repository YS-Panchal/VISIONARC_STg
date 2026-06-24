/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
      {
        protocol: 'https',
        hostname: '*.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.website-files.com',
      },
    ],
  },
};

export default nextConfig;
