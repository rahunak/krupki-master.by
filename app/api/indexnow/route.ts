/**
 * POST /api/indexnow — уведомление поисковиков (Яндекс, Bing, Seznam, Naver)
 * об изменении/добавлении страниц через протокол IndexNow.
 *
 * Протокол: POST JSON на indexnow.org / api.indexnow.org с host, key, urlList.
 * Ключ-файл лежит в /public/indexnow-key.txt и подтверждает владение доменом.
 *
 * Использование:
 *   curl -X POST https://krupki-master.by/api/indexnow \
 *     -H 'Content-Type: application/json' \
 *     -d '{"urls":["https://krupki-master.by/doski/"]}'
 * Можно и без body — тогда отправляется весь sitemap.
 *
 * Защита: GET запрещён (не отдаём ключ наружу), POST без JSON — тоже ок
 * (отправит sitemap), но частоту ограничивает сам протокол: поисковики
 * дедуплицируют URL сами.
 */

import { NextRequest, NextResponse } from "next/server";
import { PUBLIC_ROUTES } from "@/data/routes";

const SITE_URL = "https://krupki-master.by";
const INDEXNOW_KEY = "8be2a9a1aced14dc3c8d1d3b65e50aa0";
// api.indexnow.org — балансировщик; Яндекс/Bing получат сами.
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/IndexNow";

// Единый список публичных URL (data/routes.ts) — тот же, что у sitemap.xml.
const SITEMAP_URLS = PUBLIC_ROUTES.map((route) => `${SITE_URL}${route.path}`);

export async function POST(req: NextRequest) {
  let urls: string[] = SITEMAP_URLS;

  try {
    const body = await req.json();
    if (Array.isArray(body?.urls) && body.urls.length > 0) {
      urls = body.urls
        .filter((u: unknown): u is string => typeof u === "string")
        .filter((u: string) => u.startsWith(SITE_URL))
        .slice(0, 100); // лимит протокола — 10 000, capped консервативно
    }
  } catch {
    // нет body или невалидный JSON — отправляем весь sitemap
  }

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({
        host: "krupki-master.by",
        key: INDEXNOW_KEY,
        urlList: urls,
      }),
      cache: "no-store",
    });

    // 200/202 — принято; 400/403/422 — проблема с ключом/форматом; 429 — rate limit
    return NextResponse.json(
      {
        ok: res.ok,
        status: res.status,
        submitted: urls.length,
        note: res.ok
          ? "IndexNow принял запрос"
          : "Проверьте ключ-файл /indexnow-key.txt доступен по https",
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("IndexNow submit error:", err);
    return NextResponse.json({ ok: false, error: "network error" }, { status: 502 });
  }
}

export async function GET() {
  return NextResponse.json(
    { error: "Use POST with {\"urls\": [...]}. GET disabled to keep the key private." },
    { status: 405 },
  );
}
