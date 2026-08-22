import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ['/_next/', '/api/', '/admin/'],
      },
      {
        userAgent: "Yandex",
        allow: "/",
        disallow: ['/_next/', '/api/', '/admin/'],
      },
      {
        userAgent: "GPTBot",
        allow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
    ],
    sitemap: "https://krupki-master.by/sitemap.xml",
    host: "https://krupki-master.by",
  };
}