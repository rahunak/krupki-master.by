import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // GSC «Страница с переадресацией»: единый канонический хост.
  // www-поддомен указывает на Vercel, но его сертификат покрывает только
  // apex-домен, поэтому HTTPS-цепочка для www рвётся. Гарантируем 308
  // www → apex на уровне приложения, независимо от DNS-настройки хостинга.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.krupki-master.by" }],
        destination: "https://krupki-master.by/:path*",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
