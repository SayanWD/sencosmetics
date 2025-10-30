/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/webp', 'image/avif'],
  },
  i18n: {
    locales: ['kz', 'ru'],
    defaultLocale: 'ru',
  },
}

export default nextConfig
