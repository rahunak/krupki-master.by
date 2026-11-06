import { NextResponse, type NextRequest } from "next/server";
import { ROUTES_WITHOUT_SLASH } from "@/data/routes";

/**
 * Канонизация URL (SDD 2.4, 3.8, T-05):
 *   • известный маршрут без слэша (/uslugi) → 301 на /uslugi/;
 *   • путь в верхнем регистре → 301 на строчный;
 *   • несуществующий путь (/net-takoy) → 404 напрямую, без 308-цепочки (T-06).
 *
 * Работает только вместе с двумя флагами в next.config.ts:
 *   skipTrailingSlashRedirect: true  — Next не ставит свой 308 на любой путь;
 *   skipProxyUrlNormalize: true     — Next не нормализует путь запроса.
 * Тело редиректа отдаёт app/api/redirect/route.ts (причина — в его шапке).
 *
 * Список маршрутов — data/routes.ts (тот же, что у sitemap.xml и IndexNow).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Статика, API и файлы с расширением не трогаем.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    /\.[a-z0-9]+$/i.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Next переписывает Location у NextResponse.redirect, когда цель отличается
  // от запроса только завершающим слэшем (петля /uslugi → /uslugi). Поэтому
  // внутренний rewrite на хендлер, который отдаёт 301 сам: для клиента это
  // один обычный редирект.
  const redirectTo = (target: string) => {
    const headers = new Headers(request.headers);
    headers.set("x-redirect-to", target);
    return NextResponse.rewrite(new URL("/api/redirect", request.nextUrl.origin), {
      request: { headers },
    });
  };

  const lower = pathname.toLowerCase();

  if (pathname !== "/" && !pathname.endsWith("/")) {
    if (ROUTES_WITHOUT_SLASH.has(lower)) {
      return redirectTo(`${lower}/`);
    }
    // Неизвестный путь без слэша — 404 напрямую, без редиректа.
    return NextResponse.next();
  }

  if (pathname !== lower) {
    return redirectTo(lower);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
