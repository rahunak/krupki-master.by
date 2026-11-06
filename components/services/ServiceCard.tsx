import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * ServiceCard — карточка услуги для хаба /uslugi/ и главной (SDD 5).
 * Цена «от» выводится только если она согласована (priceFrom !== null).
 */
export default function ServiceCard({
  href,
  name,
  description,
  priceFrom,
  priceUnit,
}: {
  href: string;
  name: string;
  description: string;
  priceFrom?: number | null;
  priceUnit?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col justify-between border border-white/[0.07] bg-white/[0.02] rounded-[3px] p-6 hover:border-[#D97706]/40 transition-colors"
    >
      <div>
        <h3 className="text-lg font-semibold text-[#EDE8E0] mb-2 group-hover:text-[#F59E0B] transition-colors">
          {name}
        </h3>
        <p className="text-[#7A8494] text-sm leading-relaxed">{description}</p>
      </div>
      <div className="flex items-end justify-between mt-6 pt-4 border-t border-white/[0.05]">
        <span className="font-mono text-sm">
          {typeof priceFrom === "number" ? (
            <>
              <span className="text-[#D97706] font-bold">от {priceFrom}</span>{" "}
              <span className="text-[#3D3D42] text-xs">BYN{priceUnit ? ` · ${priceUnit}` : ""}</span>
            </>
          ) : (
            <span className="text-[#7A8494] font-sans text-xs">цена после замера</span>
          )}
        </span>
        <ArrowRight
          size={15}
          className="text-[#555560] group-hover:text-[#D97706] group-hover:translate-x-0.5 transition-all"
          aria-hidden="true"
        />
      </div>
    </Link>
  );
}
