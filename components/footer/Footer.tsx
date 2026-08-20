import { MapPin, Clock, Phone, FileText } from "lucide-react";
import Logo from "../header/Logo";

const NAV_LINKS = [
  { href: "#services", label: "Услуги" },
  { href: "#delivery", label: "Доставка" },
  { href: "#contacts", label: "Контакты" },
];

export default function Footer() {
  return (
    <footer
      id="contacts"
      aria-label="Контакты и информация о мастерской"
      className="border-t border-white/[0.06] bg-[#090909] py-16"
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid md:grid-cols-[1fr_180px_180px] gap-12 md:gap-8 lg:gap-16">
          {/* Brand + address */}
          <div>
            <Logo />
            <p className="text-[#3D3D42] text-sm leading-relaxed mt-5 mb-7 max-w-sm">
              Мастерская Krupki Master. Индивидуальное ремесленное производство.
              Профессиональная заточка ножей в Крупках с доставкой по Беларуси.
            </p>

            <address className="not-italic space-y-3">
              <p className="flex items-center gap-2.5 text-[13px] text-[#6E7886]">
                <MapPin size={13} className="text-[#D97706] shrink-0" aria-hidden="true" />
                г. Крупки, Минская обл., Беларусь
              </p>
              <p className="flex items-center gap-2.5 text-[13px] text-[#6E7886]">
                <Clock size={13} className="text-[#D97706] shrink-0" aria-hidden="true" />
                Пн–Сб, 09:00–18:00
              </p>
              <a href="tel:+375333123386" className="flex items-center gap-2.5 text-[13px] text-[#6E7886] hover:text-[#D97706] transition-colors duration-200">
                <Phone size={13} className="text-[#D97706] shrink-0" aria-hidden="true" />
                +375 (33) 312-33-86
              </a>
              <p className="flex items-center gap-2.5 text-[13px] text-[#6E7886]">
                <FileText size={13} className="text-[#D97706] shrink-0" aria-hidden="true" />
                УНП:&nbsp;123456789
              </p>
            </address>
          </div>

          {/* Navigation */}
          <nav aria-label="Разделы сайта" className="flex flex-col gap-3">
            <p className="text-[#2A2A2E] text-[10px] font-bold tracking-[0.2em] uppercase mb-1 select-none">
              Навигация
            </p>
            {NAV_LINKS.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-[#555560] text-sm hover:text-[#EDE8E0] transition-colors duration-200"
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* CTA column */}
          <div className="flex flex-col gap-3">
            <p className="text-[#2A2A2E] text-[10px] font-bold tracking-[0.2em] uppercase mb-1 select-none">
              Заявка
            </p>
            <a
              href="#order"
              className="text-[#D97706] text-sm font-semibold hover:text-[#F59E0B] transition-colors duration-200"
            >
              Оформить заявку →
            </a>
            <a
              href="#delivery"
              className="text-[#555560] text-sm hover:text-[#EDE8E0] transition-colors duration-200"
            >
              Как работает доставка
            </a>
            <a
              href="#services"
              className="text-[#555560] text-sm hover:text-[#EDE8E0] transition-colors duration-200"
            >
              Услуги и цены
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.04] mt-14 pt-7 flex flex-col md:flex-row justify-between gap-3">
          <p className="text-[#2A2A2E] text-xs">
            © 2024 Krupki Master · Заточка ножей Крупки · Доставка по Беларуси
          </p>
          <p className="text-[#2A2A2E] text-xs">Индивидуальный предприниматель · ИП</p>
        </div>
      </div>
    </footer>
  );
}
