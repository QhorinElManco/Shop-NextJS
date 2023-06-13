const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  env: {
    MONGO_URL: process.env.MONGO_URL,
    JWT_SECRET_SEED: process.env.JWT_SECRET_SEED,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
});
