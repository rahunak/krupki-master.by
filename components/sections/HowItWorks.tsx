import SectionLabel from "./SectionLabel";

const STEPS = [
  {
    num: "01",
    title: "Заявка на сайте",
    desc: "Заполните форму: опишите инструмент и укажите ваш город.",
  },
  {
    num: "02",
    title: "Отправка Белпочтой / СДЭК",
    desc: "Упакуйте инструмент и отправьте на адрес мастерской в Крупках.",
  },
  {
    num: "03",
    title: "Оценка и заточка — 1–3 дня",
    desc: "Мастер осмотрит, согласует цену и выполнит прецизионную заточку.",
  },
  {
    num: "04",
    title: "Возврат с оплатой",
    desc: "Отправляем обратно. Наложенный платёж или предоплата на карту.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="delivery"
      aria-labelledby="delivery-heading"
      className="py-24 md:py-32 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="mb-14">
          <SectionLabel>Заточка ножей Крупки · Доставка по Беларуси</SectionLabel>
          <h2
            id="delivery-heading"
            className="text-3xl md:text-4xl font-bold text-[#EDE8E0] tracking-tight"
          >
            Как работает доставка
          </h2>
        </div>

        {/* Steps grid — gap-px technique for clean dividers */}
        <div className="grid md:grid-cols-4 gap-px bg-white/[0.06]">
          {STEPS.map((step, i) => (
            <article
              key={step.num}
              className="relative bg-[#0C0C0E] p-8 md:p-9 hover:bg-[#0F0F11] transition-colors duration-300 group"
            >
              {/* Step number */}
              <div className="flex items-center gap-3 mb-7">
                <span className="font-mono font-bold text-[#D97706] text-xs tracking-widest">
                  {step.num}
                </span>
                {/* Connector — only on desktop, not the last item */}
                {i < STEPS.length - 1 && (
                  <span className="hidden md:block absolute right-0 top-[52px] w-px h-4 bg-[#D97706]/20" />
                )}
              </div>
              <h3 className="text-[#EDE8E0] font-semibold text-[15px] leading-snug mb-3 group-hover:text-white transition-colors duration-200">
                {step.title}
              </h3>
              <p className="text-[#555560] text-sm leading-relaxed">{step.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
