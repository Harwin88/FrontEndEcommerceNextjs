/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ AGREGADO: Optimizaciones experimentales
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  // ✅ AGREGADO: Compilador optimizado
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // ✅ MEJORADO: Configuración de imágenes optimizada
  images: {
    domains: ['res.cloudinary.com'],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // ✅ AGREGADO: Headers de seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },

  // ✅ AGREGADO: Optimización de webpack
  webpack: (config, { dev, isServer }) => {
    // Optimización de chunks solo en producción
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            minChunks: 2,
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };
    }

    return config;
  },

  // ✅ AGREGADO: Configuración de compresión
  compress: true,
};

module.exports = nextConfig;
