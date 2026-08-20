import { ArrowRight } from "lucide-react";

export default function MobileCTA() {
  return (
    <>
      {/* Mobile floating CTA bar */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 p-3 bg-gradient-to-t from-[#0C0C0E] via-[#0C0C0E]/95 to-transparent pt-6">
        <a
          href="#order"
          className="flex items-center justify-center gap-2 w-full bg-[#D97706] text-[#0A0A0B] font-bold text-[15px] py-4 rounded-[2px] shadow-[0_8px_32px_rgba(217,119,6,0.35)]"
        >
          Оставить заявку мастеру
          <ArrowRight size={16} />
        </a>
      </div>

      {/* Spacer for mobile CTA bar */}
      <div className="md:hidden h-20" />
    </>
  );
}
