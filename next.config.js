/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "pbs.twimg.com",
      "avatars.githubusercontent.com",
    ],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
