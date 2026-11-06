import { NextResponse, type NextRequest } from "next/server";
import { PUBLIC_PATHS } from "@/data/routes";

/**
 * Канонизация URL (SDD 2.4, 3.8, T-05).
 *
 * Зачем отдельный хендлер: Next переписывает заголовок Location у редиректов
 * из proxy и из redirects() в next.config, когда цель отличается от запроса
 * только завершающим слэшем (/uslugi → Location: /uslugi), что даёт
 * бесконечную петлю. Ответ route-хендлера отдаётся как есть — Location
 * сохраняется. Proxy делает внутренний rewrite на этот хендлер, поэтому
 * для клиента и поисковика это один обычный 301.
 *
 * Открытого редиректа нет: разрешены только пути из data/routes.ts.
 */
export function GET(request: NextRequest) {
  // Цель приходит заголовком: query-строку rewrite из proxy не переносит.
  const to = request.headers.get("x-redirect-to") ?? "";

  if (!PUBLIC_PATHS.has(to)) {
    return NextResponse.json({ error: "unknown redirect target" }, { status: 404 });
  }

  return new NextResponse(null, {
    status: 301,
    headers: {
      Location: to,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
