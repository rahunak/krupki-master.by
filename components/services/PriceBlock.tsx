import type { PriceItem } from "@/data/services";

/**
 * PriceBlock — цены «от» (SDD 5, 4.2).
 *
 * Если priceFrom === null, выводится «по запросу»: прайс по услугам
 * ремонта/электрики/штукатурки согласовывает владелец (T-10), выдумывать
 * цифры запрещено (жёсткие запреты SDD).
 */
export default function PriceBlock({
  items,
  title = "Цены",
  note = "Цена «от» — ориентир по типовому объёму. Точную стоимость называем после замера: она зависит от объёма, состояния основания и материалов.",
}: {
  items: PriceItem[];
  title?: string;
  note?: string;
}) {
  return (
    <section aria-labelledby="price-heading" className="py-12">
      <h2 id="price-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
        {title}
      </h2>
      <div className="border border-white/[0.07] rounded-[3px] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left bg-white/[0.02]">
              <th className="py-3 px-4 text-[#EDE8E0] font-semibold">Работа</th>
              <th className="py-3 px-4 text-[#EDE8E0] font-semibold">Единица</th>
              <th className="py-3 px-4 text-[#EDE8E0] font-semibold text-right">Цена</th>
            </tr>
          </thead>
          <tbody>
            {items.map((p) => (
              <tr key={p.name} className="border-b border-white/5 last:border-0">
                <td className="py-3 px-4 text-[#C8C2BA]">{p.name}</td>
                <td className="py-3 px-4 text-[#7A8494]">{p.unit}</td>
                <td className="py-3 px-4 text-right font-mono whitespace-nowrap">
                  {p.priceFrom === null ? (
                    <span className="text-[#7A8494] font-sans">по запросу</span>
                  ) : p.priceFrom === 0 ? (
                    <span className="text-[#6FB3A0] font-sans">бесплатно</span>
                  ) : (
                    <span className="text-[#F59E0B] font-semibold">от {p.priceFrom} BYN</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[#333337] text-xs mt-3 leading-relaxed">{note}</p>
    </section>
  );
}
