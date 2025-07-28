/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'quarter-nextjs.vercel.app',
        pathname: '/img/others/**', // Allow images under this path
      },
    ],
  },
};

module.exports = nextConfig;
