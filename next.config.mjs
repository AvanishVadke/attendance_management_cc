/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure Prisma generates properly on Vercel
  serverExternalPackages: ['@prisma/client', 'prisma'],
  // Optimize for production builds
  experimental: {
    // Add any experimental features here if needed
  },
  // Ensure proper handling of environment variables
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
  }
};

export default nextConfig;
