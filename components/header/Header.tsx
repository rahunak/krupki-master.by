"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronRight, Phone } from "lucide-react";
import Link from "next/link";
import Logo from "./Logo";
import { PHONE_DISPLAY, PHONE_NUMBER } from "@/data/contacts";

/**
 * Меню сайта после репозиционирования (SDD 3.5 UI, T-26):
 * Услуги · Цены · Мастерская.
 * Блог и деревянные изделия переехали в футер — это контентные разделы,
 * а не главные точки входа для клиента с задачей по дому.
 * «Работы» убраны из меню: портфолио пустое (data/works.ts), вести клиента
 * на заглушку нельзя. Вернуть, когда появятся реальные объекты.
 */
const NAV_LINKS = [
  { href: "/uslugi/", label: "Услуги" },
  { href: "/ceny/", label: "Цены" },
  { href: "/zatochka/", label: "Мастерская" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.07] bg-[#0C0C0E]/95 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between gap-6">
        <Logo />

        <nav className="hidden md:flex items-center gap-8" aria-label="Основная навигация">
          {NAV_LINKS.map((n) => (
            n.href.startsWith("/") ? (
              <Link
                key={n.href}
                href={n.href}
                className="text-[13px] font-medium text-[#7A8494] hover:text-[#EDE8E0] transition-colors duration-200"
              >
                {n.label}
              </Link>
            ) : (
              <a
                key={n.href}
                href={n.href}
                className="text-[13px] font-medium text-[#7A8494] hover:text-[#EDE8E0] transition-colors duration-200"
              >
                {n.label}
              </a>
            )
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Телефон в шапке: часть клиентов не заполняет форму, а звонит сразу */}
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="hidden lg:inline-flex items-center gap-1.5 text-[#C8C2BA] text-[13px] font-medium whitespace-nowrap hover:text-[#D97706] transition-colors duration-200"
          >
            <Phone size={14} aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>
          <Link
            href="/#order"
            className="hidden md:inline-flex items-center gap-1.5 bg-[#D97706] text-[#0A0A0B] font-bold text-[13px] px-5 py-2.5 rounded-[2px] hover:bg-[#F59E0B] active:scale-[0.98] transition-all duration-150"
          >
            Оставить заявку
          </Link>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden w-9 h-9 flex items-center justify-center text-[#7A8494] hover:text-[#EDE8E0] transition-colors"
            aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#0C0C0E]/98 backdrop-blur-xl px-5 pb-6 pt-2">
          <nav aria-label="Мобильная навигация">
            {NAV_LINKS.map((n) => (
              n.href.startsWith("/") ? (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between text-[#EDE8E0] text-base py-3.5 border-b border-white/[0.05] last:border-0"
                >
                  {n.label}
                  <ChevronRight size={14} className="text-[#555560]" />
                </Link>
              ) : (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between text-[#EDE8E0] text-base py-3.5 border-b border-white/[0.05] last:border-0"
                >
                  {n.label}
                  <ChevronRight size={14} className="text-[#555560]" />
                </a>
              )
            ))}
          </nav>
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center gap-2 mt-4 text-[#C8C2BA] text-[15px] font-medium"
          >
            <Phone size={15} className="text-[#D97706]" aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>
          <Link
            href="/#order"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center gap-2 mt-4 w-full bg-[#D97706] text-[#0A0A0B] font-bold text-[15px] py-4 rounded-[2px]"
          >
            Оставить заявку
          </Link>
        </div>
      )}
    </header>
  );
}
