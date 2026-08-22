import SectionLabel from "./SectionLabel";
import { StepsSection } from "./StepsSection";

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
            Как заказать заточку с доставкой по Беларуси
          </h2>
        </div>
        <StepsSection />
      </div>
    </section>
  );
}
