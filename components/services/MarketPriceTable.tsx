import Link from "next/link";
import type { MarketPriceGroup } from "@/data/market-prices";

/**
 * Таблица средних цен по рынку для /ceny/.
 * Цифры — ориентир по открытым прайсам, а не прайс мастера и не оферта.
 */
export default function MarketPriceTable({ group }: { group: MarketPriceGroup }) {
  return (
    <section aria-labelledby={`market-${group.slug}`} className="py-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
        <h2
          id={`market-${group.slug}`}
          className="text-xl md:text-2xl font-bold tracking-tight"
        >
          {group.title}
        </h2>
        {group.path && (
          <Link
            href={group.path}
            className="text-[#D97706] text-sm hover:text-[#F59E0B] transition-colors"
          >
            Что входит в услугу →
          </Link>
        )}
      </div>

      <div className="border border-white/[0.07] rounded-[3px] overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left bg-white/[0.02]">
              <th className="py-3 px-4 text-[#EDE8E0] font-semibold">Работа</th>
              <th className="py-3 px-4 text-[#EDE8E0] font-semibold">Единица</th>
              <th className="py-3 px-4 text-[#EDE8E0] font-semibold text-right whitespace-nowrap">
                Цена «от»
              </th>
              <th className="py-3 px-4 text-[#EDE8E0] font-semibold whitespace-nowrap">
                Диапазон по рынку
              </th>
            </tr>
          </thead>
          <tbody>
            {group.items.map((p) => (
              <tr key={p.name} className="border-b border-white/5 last:border-0">
                <td className="py-3 px-4 text-[#C8C2BA]">{p.name}</td>
                <td className="py-3 px-4 text-[#7A8494]">{p.unit}</td>
                <td className="py-3 px-4 text-right font-mono whitespace-nowrap">
                  {p.averageFrom === 0 ? (
                    <span className="text-[#6FB3A0] font-sans">бесплатно</span>
                  ) : (
                    <span className="text-[#F59E0B] font-semibold">
                      от {p.averageFrom} BYN
                    </span>
                  )}
                </td>
                <td className="py-3 px-4 text-[#7A8494] whitespace-nowrap">{p.range}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
