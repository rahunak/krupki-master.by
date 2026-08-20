import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import SectionLabel from "./SectionLabel";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative min-h-screen flex flex-col justify-center pt-16"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-[#0C0C0E]">
        <Image
          src="https://images.unsplash.com/photo-1593618998160-e34014e67546?w=1800&h=1100&fit=crop&auto=format"
          alt="Кузнечные инструменты и нож на тёмном фоне"
          fill
          priority
          className="object-cover opacity-[0.14] mix-blend-luminosity"
          sizes="100vw"
        />
        {/* Gradient masks */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0C0E] via-[#0C0C0E]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0C0E] via-[#0C0C0E]/10 to-[#0C0C0E]/60" />
        {/* Amber atmospheric glow */}
        <div className="absolute top-1/2 -translate-y-1/2 left-[15%] w-[600px] h-[400px] rounded-full bg-[#D97706]/[0.035] blur-[80px]" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0C0C0E] to-transparent" />
      </div>

      {/* Decorative vertical rule */}
      <div className="absolute left-5 md:left-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
        <span className="w-px h-16 bg-gradient-to-b from-transparent to-[#D97706]/40" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]/60" />
        <span className="w-px h-16 bg-gradient-to-t from-transparent to-[#D97706]/40" />
      </div>

      <div className="relative max-w-6xl mx-auto px-5 w-full py-24 md:py-28 lg:py-32">
        <div className="max-w-[680px]">
          <SectionLabel>Мастерская · Крупки, Минская обл.</SectionLabel>

          <h1
            id="hero-heading"
            className="text-[2.6rem] md:text-5xl lg:text-[3.4rem] font-extrabold text-[#EDE8E0] leading-[1.07] tracking-[-0.02em] mb-6"
          >
            Профессиональная заточка ножей и инструмента в Крупках{" "}
            <span className="text-[#D97706]">с доставкой по Беларуси</span>
          </h1>

          <p className="text-[17px] md:text-lg text-[#6E7886] leading-relaxed mb-10 max-w-lg">
            Прецизионная ручная заточка под точным углом. Вернём остроту ножам, пилам,
            садовому инструменту — отправьте Белпочтой из любого города страны.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-14">
            <a
              href="#order"
              className="inline-flex items-center justify-center gap-2 bg-[#D97706] text-[#0A0A0B] font-bold text-base px-7 py-4 rounded-[2px] hover:bg-[#F59E0B] active:scale-[0.98] transition-all duration-150 group"
            >
              Рассчитать стоимость
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center justify-center gap-2 border border-white/[0.12] text-[#C8C2BA] font-medium text-base px-7 py-4 rounded-[2px] hover:border-white/25 hover:text-[#EDE8E0] hover:bg-white/[0.03] transition-all duration-200"
            >
              Смотреть цены
            </a>
          </div>

          {/* Trust strip */}
          <div className="flex flex-wrap gap-x-8 gap-y-3 pt-10 border-t border-white/[0.07]">
            {[
              { label: "Опыт 10+ лет" },
              { label: "Доставка по всей Беларуси" },
              { label: "Ответ за 2 часа" },
            ].map(({ label }) => (
              <span key={label} className="flex items-center gap-2 text-[13px] text-[#555560]">
                <span className="w-1 h-1 rounded-full bg-[#D97706]" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <a
        href="#delivery"
        aria-label="Перейти ниже"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#333337] hover:text-[#D97706] transition-colors duration-200"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">Далее</span>
        <ChevronDown size={16} />
      </a>
    </section>
  );
}
