import { withContentCollections } from "@content-collections/next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },
  trailingSlash: false,
  transpilePackages: ["shiki", "jimp"],
  experimental: {
    serverComponentsExternalPackages: [
      "@react-email/components",
      "@react-email/render",
      "@react-email/tailwind",
    ],
    optimizePackageImports: ["framer-motion"],
    webVitalsAttribution: ["FCP", "LCP", "CLS", "FID", "TTFB", "INP"],
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
    // allow next/image to serve remote images from safelisted domains
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "api.microlink.io",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "cdn.bucharitesh.in",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/r",
        destination: "/r/index.json",
        permanent: true,
      },
      {
        source: "/r/index",
        destination: "/r/index.json",
        permanent: true,
      },
      {
        source: "/r/:name((?!index\\.json|styles/).*)",
        destination: "/r/styles/default/:name.json",
        permanent: true,
        missing: [
          {
            type: "query",
            key: "_redirected",
            value: undefined,
          },
        ],
      },
    ];
  },
};

// const millionConfig = {
//   auto: {
//     rsc: true,
//   },
//   server: true,
//   rsc: true,
// }

// const config = withContentlayer(nextConfig)
// module.exports = million.next(config, millionConfig);

// module.exports = withContentlayer(nextConfig);

export default withContentCollections(nextConfig);
