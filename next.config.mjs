import bundleAnalyzer from '@next/bundle-analyzer';
const withBundleAnalyzer = bundleAnalyzer;

/** @type {import('next').NextConfig} */
let nextConfig = {
  reactStrictMode: true,
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
  devIndicators: false,
  serverExternalPackages: [
    'shiki',
    '@react-email/components',
    '@react-email/render',
    '@react-email/tailwind',
  ],
  experimental: {
    optimizePackageImports: ['motion'],
    webVitalsAttribution: ['FCP', 'LCP', 'CLS', 'FID', 'TTFB', 'INP'],
  },
  webpack: (config, { webpack, isServer }) => {
    if (isServer) {
      config.plugins.push(
        // mute errors for unused typeorm deps
        new webpack.IgnorePlugin({
          resourceRegExp:
            /(^@google-cloud\/spanner|^@mongodb-js\/zstd|^aws-crt|^aws4$|^pg-native$|^mongodb-client-encryption$|^@sap\/hana-client$|^@sap\/hana-client\/extension\/Stream$|^snappy$|^react-native-sqlite-storage$|^bson-ext$|^cardinal$|^kerberos$|^hdb-pool$|^sql.js$|^sqlite3$|^better-sqlite3$|^ioredis$|^typeorm-aurora-data-api-driver$|^pg-query-stream$|^oracledb$|^mysql$|^snappy\/package\.json$|^cloudflare:sockets$)/,
        })
      );
    }

    config.module = {
      ...config.module,
      exprContextCritical: false,
    };

    return config;
  },
  images: {
    deviceSizes: [390, 435, 768, 1024, 1280],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'api.microlink.io',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.bucharitesh.in',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

if (process.env.ANALYZE === 'true') {
  nextConfig = withBundleAnalyzer(nextConfig);
}

export default nextConfig;
