import Link from "next/link";
import { MapPin, Clock, Phone, FileText } from "lucide-react";
import Logo from "../header/Logo";
import { PHONE_NUMBER } from "@/data/contacts";

/**
 * Футер (SDD 5): основное направление — бытовые услуги, мастерская
 * (заточка, дерево) и блог — отдельными группами ссылок.
 */
const SERVICES_LINKS = [
  { href: "/uslugi/", label: "Все услуги" },
  { href: "/uslugi/elektrik/", label: "Электрика" },
  { href: "/uslugi/santehnik/", label: "Сантехника" },
  { href: "/uslugi/shtukaturka/", label: "Декоративная штукатурка" },
  { href: "/uslugi/remont/", label: "Отделочные работы" },
  { href: "/ceny/", label: "Цены" },
];

const WORKSHOP_LINKS = [
  { href: "/zatochka/", label: "Заточка" },
  { href: "/zatochka/nozhi/", label: "Ножи" },
  { href: "/zatochka/cepi-benzopil/", label: "Цепи бензопил" },
  { href: "/zatochka/instrument/", label: "Инструмент" },
  { href: "/doski/", label: "Изделия из дерева" },
  { href: "/blog/", label: "Блог" },
];

export default function Footer() {
  return (
    <footer
      id="contacts"
      aria-label="Контакты и информация о мастерской"
      className="border-t border-white/[0.06] bg-[#090909] py-16"
    >
      <div className="max-w-6xl mx-auto px-5">
        <div className="grid gap-12 md:gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="text-[#3D3D42] text-sm leading-relaxed mt-5 mb-7 max-w-sm">
              Крупки Мастер: бытовые услуги с выездом на объект и мастерская —
              заточка инструмента, изделия из дуба. Крупки, Борисов, Толочин,
              Новолукомль и 50 км.
            </p>

            <address className="not-italic space-y-3">
              <p className="flex items-center gap-2.5 text-[13px] text-[#6E7886]">
                <MapPin size={13} className="text-[#D97706] shrink-0" aria-hidden="true" />
                Крупский р-н, д. Прошика, ул. Молодёжная, 1
              </p>
              <p className="flex items-center gap-2.5 text-[13px] text-[#6E7886]">
                <Clock size={13} className="text-[#D97706] shrink-0" aria-hidden="true" />
                Пн–Пт 09:00–18:00 · Сб 10:00–15:00
              </p>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="flex items-center gap-2.5 text-[13px] text-[#6E7886] hover:text-[#D97706] transition-colors duration-200"
              >
                <Phone size={13} className="text-[#D97706] shrink-0" aria-hidden="true" />
                +375 (25) 781-09-98
              </a>
              <p className="flex items-center gap-2.5 text-[13px] text-[#6E7886]">
                <FileText size={13} className="text-[#D97706] shrink-0" aria-hidden="true" />
                УНП:&nbsp;KA7633473
              </p>
            </address>
          </div>

          <nav aria-label="Услуги" className="flex flex-col gap-3">
            <p className="text-[#2A2A2E] text-[10px] font-bold tracking-[0.2em] uppercase mb-1 select-none">
              Услуги
            </p>
            {SERVICES_LINKS.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-[#555560] text-sm hover:text-[#EDE8E0] transition-colors duration-200"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <nav aria-label="Заточка" className="flex flex-col gap-3">
            <p className="text-[#2A2A2E] text-[10px] font-bold tracking-[0.2em] uppercase mb-1 select-none">
              Заточка
            </p>
            {WORKSHOP_LINKS.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="text-[#555560] text-sm hover:text-[#EDE8E0] transition-colors duration-200"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <p className="text-[#2A2A2E] text-[10px] font-bold tracking-[0.2em] uppercase mb-1 select-none">
              О мастерской
            </p>
            <Link
              href="/o-mastere/"
              className="text-[#555560] text-sm hover:text-[#EDE8E0] transition-colors duration-200"
            >
              О мастере
            </Link>
            <Link
              href="/kontakty/"
              className="text-[#555560] text-sm hover:text-[#EDE8E0] transition-colors duration-200"
            >
              Контакты и зона выезда
            </Link>
            <Link
              href="/#order"
              className="text-[#D97706] text-sm font-semibold hover:text-[#F59E0B] transition-colors duration-200 mt-1"
            >
              Оставить заявку →
            </Link>
          </div>
        </div>

        <div className="border-t border-white/[0.04] mt-14 pt-7 flex flex-col md:flex-row justify-between gap-3">
          <p className="text-[#2A2A2E] text-xs">
            © 2026 Krupki Master · Бытовые услуги и мастерская · Крупки + 50 км
          </p>
          <p className="text-[#2A2A2E] text-xs">УНП:&nbsp;KA7633473</p>
        </div>
      </div>
    </footer>
  );
}
