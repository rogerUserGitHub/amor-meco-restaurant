/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add these lines for static export
  output: 'export',
  trailingSlash: true,
  
  // Performance optimizations
  swcMinify: true,
  compress: true,
  poweredByHeader: false,

  // Image optimizations - MUST be unoptimized for static export
  images: {
    unoptimized: true, // Required for static export
    domains: ['images.unsplash.com', 'via.placeholder.com'],
  },

  // Experimental features for performance
  experimental: {
    optimizeCss: false,
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      };
    }

    return config;
  },
};

module.exports = nextConfig;
