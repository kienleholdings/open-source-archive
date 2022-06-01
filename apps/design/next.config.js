/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // We handle linting concurrently in our GitHub actions jobs, let's skip that while building
    ignoreDuringBuilds: true,
  },
  // We want to be able to co-locate our tests with our pages, so we need to add this. Reference:
  // https://nextjs.org/docs/api-reference/next.config.js/custom-page-extensions#including-non-page-files-in-the-pages-directory
  pageExtensions: ['page.tsx', 'page.ts'],
  reactStrictMode: true,
};

module.exports = nextConfig;
