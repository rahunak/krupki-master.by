import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { PHONE_NUMBER } from "@/data/contacts";

/**
 * CTA — телефон + кнопка заявки (SDD 5).
 * Для услуг с аварийным интентом (электрика, сантехника) телефон важнее формы,
 * поэтому он стоит первым действием на первом экране страницы.
 */
export default function CTA({
  heading,
  text,
  orderHref = "#order",
  orderLabel = "Оставить заявку",
  variant = "default",
}: {
  heading?: string;
  text?: string;
  orderHref?: string;
  orderLabel?: string;
  variant?: "default" | "hero";
}) {
  const phone = (
    <a
      href={`tel:${PHONE_NUMBER}`}
      className={
        variant === "hero"
          ? "inline-flex items-center justify-center gap-2 bg-[#D97706] text-[#0A0A0B] font-bold text-base px-7 py-4 rounded-[2px] hover:bg-[#F59E0B] active:scale-[0.98] transition-all duration-150"
          : "inline-flex items-center justify-center gap-2 border border-[#D97706]/40 bg-[#D97706]/[0.08] text-[#EDE8E0] font-semibold text-sm px-5 py-3 rounded-[2px] hover:bg-[#D97706]/[0.14] transition-colors"
      }
    >
      <Phone size={variant === "hero" ? 17 : 15} aria-hidden="true" />
      +375 (25) 781-09-98
    </a>
  );

  const order = (
    <Link
      href={orderHref}
      className={
        variant === "hero"
          ? "inline-flex items-center justify-center gap-2 border border-white/[0.12] text-[#C8C2BA] font-medium text-base px-7 py-4 rounded-[2px] hover:border-white/25 hover:text-[#EDE8E0] hover:bg-white/[0.03] transition-all duration-200 group"
          : "inline-flex items-center justify-center gap-2 bg-[#D97706] text-[#0A0A0B] font-bold text-sm px-5 py-3 rounded-[2px] hover:bg-[#F59E0B] transition-colors group"
      }
    >
      {orderLabel}
      <ArrowRight
        size={15}
        className="group-hover:translate-x-1 transition-transform duration-200"
        aria-hidden="true"
      />
    </Link>
  );

  if (variant === "hero") {
    return (
      <div className="flex flex-col sm:flex-row gap-3">
        {phone}
        {order}
      </div>
    );
  }

  return (
    <div className="border border-white/[0.07] bg-white/[0.02] rounded-[3px] p-7 md:p-8 my-10">
      {heading && (
        <p className="text-[#EDE8E0] font-semibold text-lg mb-2">{heading}</p>
      )}
      {text && <p className="text-[#8B94A3] text-sm leading-relaxed mb-5">{text}</p>}
      <div className="flex flex-col sm:flex-row gap-3">
        {order}
        {phone}
      </div>
    </div>
  );
}
