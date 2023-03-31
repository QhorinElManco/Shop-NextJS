const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: false,
  env: {
    MONGO_URL: process.env.MONGO_URL,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
