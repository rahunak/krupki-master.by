import type { ZatochkaPrice } from "@/data/zatochka";

/**
 * Прайс мастерской (SSOT — data/zatochka.ts).
 * null — «по договорённости»: цену называем после осмотра инструмента.
 */
export default function PriceTable({
  items,
  title = "Цены на заточку",
}: {
  items: ZatochkaPrice[];
  title?: string;
}) {
  return (
    <section aria-labelledby="zatochka-price-heading" className="py-10">
      <h2
        id="zatochka-price-heading"
        className="text-2xl md:text-3xl font-bold tracking-tight mb-6"
      >
        {title}
      </h2>
      <div className="border border-white/[0.07] rounded-[3px] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left bg-white/[0.02]">
              <th className="py-3 px-4 text-[#EDE8E0] font-semibold">Инструмент</th>
              <th className="py-3 px-4 text-[#EDE8E0] font-semibold">Примечание</th>
              <th className="py-3 px-4 text-[#EDE8E0] font-semibold text-right">Цена</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.name} className="border-b border-white/5 last:border-0">
                <td className="py-3 px-4 text-[#C8C2BA]">{p.name}</td>
                <td className="py-3 px-4 text-[#7A8494]">{p.note}</td>
                <td className="py-3 px-4 text-right font-mono whitespace-nowrap">
                  {p.priceFrom === null ? (
                    <span className="text-[#7A8494] font-sans">по договорённости</span>
                  ) : (
                    <span className="text-[#F59E0B] font-semibold">от {p.priceFrom} BYN</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[#333337] text-xs mt-3 leading-relaxed">
        * Цены ориентировочные. Финальная стоимость согласовывается после осмотра инструмента.
      </p>
    </section>
  );
}
