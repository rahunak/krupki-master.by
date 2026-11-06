import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { PHONE_NUMBER } from "@/data/contacts";
import { SERVICE_LIST } from "@/data/services";

/**
 * Полезная 404 (SDD 3.7, T-06): вместо пустой заглушки — телефон, ссылки
 * на услуги и мастерскую. Часть потерянного трафика уходит на нужную
 * страницу вместо закрытия вкладки.
 *
 * noindex: страницу ошибки не нужно держать в индексе.
 */
export const metadata: Metadata = {
  title: "Страница не найдена | krupki-master.by",
  description:
    "Такой страницы на сайте нет. Услуги мастера в Крупках и районе, заточка ножей и деревянная посуда — ссылки ниже.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0C0C0E] text-[#EDE8E0] antialiased overflow-x-hidden">
      <Header />

      <main className="pt-32 pb-24 max-w-3xl mx-auto px-5">
        <p className="font-mono text-[#D97706] text-xs tracking-[0.2em] uppercase mb-4">
          Ошибка 404
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-5">
          Такой страницы нет
        </h1>
        <p className="text-[#8B94A3] leading-relaxed mb-8 max-w-xl">
          Адрес мог измениться, а может быть, в ссылке опечатка. Ниже — то, что
          чаще всего ищут: услуги мастера, цены и мастерская.
        </p>

        <a
          href={`tel:${PHONE_NUMBER}`}
          className="inline-flex items-center gap-2 border border-[#D97706]/30 bg-[#D97706]/[0.07] text-[#EDE8E0] font-semibold text-sm px-5 py-3 rounded-[2px] hover:bg-[#D97706]/[0.12] transition-colors mb-10"
        >
          <Phone size={15} className="text-[#D97706]" aria-hidden="true" />
          +375 (25) 781-09-98
        </a>

        <div className="grid sm:grid-cols-2 gap-3 mb-10">
          {[
            { href: "/uslugi/", label: "Бытовые услуги — хаб" },
            ...SERVICE_LIST.map((s) => ({ href: s.path, label: s.serviceName })),
            { href: "/zatochka/", label: "Мастерская: заточка" },
            { href: "/ceny/", label: "Цены" },
            { href: "/kontakty/", label: "Контакты и зона выезда" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex items-center justify-between border border-white/[0.07] bg-white/[0.02] rounded-[3px] px-4 py-3 text-sm text-[#C8C2BA] hover:border-[#D97706]/40 hover:text-[#EDE8E0] transition-colors"
            >
              {l.label}
              <ArrowRight size={14} className="text-[#555560]" aria-hidden="true" />
            </Link>
          ))}
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#D97706] text-[#0A0A0B] font-bold text-sm px-6 py-3.5 rounded-[2px] hover:bg-[#F59E0B] transition-colors"
        >
          На главную
          <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </main>

      <Footer />
    </div>
  );
}
