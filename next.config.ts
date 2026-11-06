import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Единый формат URL — со слэшем в конце (SDD 2.4, 3.8, T-05).
  trailingSlash: true,
  // Слэш канонизирует proxy.ts ТОЛЬКО для известных публичных маршрутов.
  // Без этого флага Next сам ставит 308 на любом пути, включая
  // несуществующие: /net-takoy-stranicy/ → 308 → /net-takoy-stranicy → 404.
  // SDD 3.7 требует честный 404 без цепочки редиректов (T-06).
  skipTrailingSlashRedirect: true,
  // Критично для редиректов из proxy: без этого флага Next нормализует путь
  // запроса (добавляет слэш) и считает редирект /uslugi → /uslugi/ редиректом
  // на самого себя, подменяя Location на исходный /uslugi → бесконечная петля.
  skipProxyUrlNormalize: true,

  async redirects() {
    return [
      // Защитный редирект SDD 2.3: путь /elektrik раньше отдавал 404,
      // теперь страница услуги живёт по /uslugi/elektrik/.
      // statusCode 301 (не permanent: permanent отдаёт 308).
      {
        source: "/elektrik",
        destination: "/uslugi/elektrik/",
        statusCode: 301,
      },
      {
        source: "/elektrik/",
        destination: "/uslugi/elektrik/",
        statusCode: 301,
      },
      // GSC «Страница с переадресацией»: единый канонический хост.
      // www-поддомен указывает на Vercel, но его сертификат покрывает только
      // apex-домен, поэтому HTTPS-цепочка для www рвётся. Гарантируем 308
      // www → apex на уровне приложения, независимо от DNS-настройки хостинга.
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
