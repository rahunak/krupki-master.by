import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        // GSC: «Заблокировано в файле robots.txt» для /_next/static/ (шрифты,
        // CSS, JS). Блокировать статику Next.js нельзя — Googlebot не сможет
        // отрендерить страницы. Allow длиннее Disallow, поэтому побеждает он
        // (правило longest-match у Google и Яндекса).
        allow: ["/", "/_next/static/"],
        // Файл верификации GSC — в выдачу не нужен (правило перенесено из
        // удалённого public/robots.txt, который никогда не отдавался:
        // маршрут app/robots.ts имел приоритет).
        disallow: ["/_next/", "/api/", "/admin/", "/09da9aae23bde0aa22847fbe03092441ce9c98f5.html"],
      },
      {
        userAgent: "Yandex",
        allow: ["/", "/_next/static/"],
        disallow: ["/_next/", "/api/", "/admin/", "/09da9aae23bde0aa22847fbe03092441ce9c98f5.html"],
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