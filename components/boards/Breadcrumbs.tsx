import Link from "next/link";

/**
 * Видимые хлебные крошки (nav + ol; семантика BreadcrumbList в JSON-LD
 * добавляется на самих страницах — см. BoardCategoryPage / app/doski/page.tsx).
 * Последний элемент не ссылается сам на себя (это текущая страница).
 */
export interface BreadcrumbItem {
  name: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Хлебные крошки" className="mb-8">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={c.name} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden="true" className="text-[#3A3A40]">
                  /
                </span>
              )}
              {c.href && !isLast ? (
                <Link
                  href={c.href}
                  className="text-[#8B94A3] hover:text-[#D97706] transition-colors"
                >
                  {c.name}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={isLast ? "text-[#C8C2BA]" : "text-[#8B94A3]"}
                >
                  {c.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
