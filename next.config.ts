import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },

  async redirects() {
    return [
      {
        source: '/:path*',
        destination: 'https://licorice4good.com/shop',
        permanent: true,
      }
    ]
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    return config;
  },
  images: {
    domains: ['images.unsplash.com', 'example.com', 'localhost', 'res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
