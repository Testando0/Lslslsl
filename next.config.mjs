/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudflare.com',
      },
    ],
  },
  // Isso ajuda a evitar erros de timeout em funções serverless da Vercel
  experimental: {
    serverComponentsExternalPackages: ['groq-sdk'],
  },
};

export default nextConfig;
