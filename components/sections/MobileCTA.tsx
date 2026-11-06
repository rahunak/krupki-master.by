import { ArrowRight, Phone } from "lucide-react";
import { PHONE_NUMBER } from "@/data/contacts";

/**
 * Мобильная нижняя панель (SDD 5, CTA).
 * Две кнопки: «Позвонить» — сразу набирает номер (часть клиентов не заполняет
 * форму, а звонит), и вторая — на форму/контакты, href настраивается:
 * на внутренних страницах форма живёт в #order этой же страницы,
 * на страницах без формы — ведём на контакты.
 */
export default function MobileCTA({
  href = "#order",
  label = "Оставить заявку",
}: {
  href?: string;
  label?: string;
}) {
  return (
    <>
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-gradient-to-t from-[#0C0C0E] via-[#0C0C0E]/95 to-transparent pt-6">
        <div className="grid grid-cols-2 gap-2">
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center justify-center gap-2 bg-[#D97706] text-[#0A0A0B] font-bold text-[15px] py-4 rounded-[2px] shadow-[0_8px_32px_rgba(217,119,6,0.35)]"
          >
            <Phone size={16} aria-hidden="true" />
            Позвонить
          </a>
          <a
            href={href}
            className="flex items-center justify-center gap-2 border border-white/20 text-[#EDE8E0] font-semibold text-[14px] py-4 rounded-[2px] bg-[#0C0C0E]/80 backdrop-blur-sm"
          >
            {label}
            <ArrowRight size={15} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="md:hidden h-20" />
    </>
  );
}
