import SectionLabel from "./SectionLabel";

const PRICES = [
  { name: "Кухонный нож", note: "ручная заточка", price: "от 10", unit: "BYN" },
  { name: "Охотничий нож", note: "восстановление геометрии", price: "от 15", unit: "BYN" },
  { name: "Цепь бензопилы", note: "каждый зуб вручную", price: "от 9", unit: "BYN" },
  { name: "Нож мясорубки", note: "нож + решётка", price: "от 9", unit: "BYN" },
  { name: "Ножницы", note: "бытовые / портновские", price: "от 5", unit: "BYN" },
  { name: "Садовый инструмент", note: "секаторы, лопаты, тяпки", price: "по договорённости", unit: "" },
];

export default function Pricing() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-24 md:py-32 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto px-5">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <SectionLabel>Прайс-лист</SectionLabel>
            <h2
              id="services-heading"
              className="text-3xl md:text-4xl font-bold text-[#EDE8E0] tracking-tight"
            >
              Цены на заточку инструмента
            </h2>
          </div>
          <p className="text-[#555560] text-sm leading-relaxed md:text-right max-w-[240px]">
            Точная цена после осмотра.
            <br />
            Сложные случаи — по договорённости.
          </p>
        </div>

        {/* Pricing cards — gap-px technique */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/[0.06]">
          {PRICES.map((item) => (
            <article
              key={item.name}
              className="bg-[#0C0C0E] p-8 md:p-9 flex flex-col justify-between hover:bg-[#0F0F11] transition-colors duration-300 group"
            >
              <div className="mb-7">
                <h3 className="text-[#C8C2BA] font-semibold text-[15px] mb-1.5 group-hover:text-[#EDE8E0] transition-colors duration-200">
                  {item.name}
                </h3>
                <p className="text-[#3D3D42] text-xs">{item.note}</p>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span
                  className={`font-mono font-bold leading-none ${item.unit
                      ? "text-[#D97706] text-2xl"
                      : "text-[#555560] text-base font-sans font-semibold"
                    }`}
                >
                  {item.price}
                </span>
                {item.unit && (
                  <span className="text-[#3D3D42] text-xs font-medium">{item.unit}</span>
                )}
              </div>
            </article>
          ))}
        </div>

        <p className="text-[#333337] text-xs mt-5 text-center">
          * Цены ориентировочные. Финальная стоимость согласовывается до начала работ.
        </p>
      </div>
    </section>
  );
}
