import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import MobileCTA from "@/components/sections/MobileCTA";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/boards/Breadcrumbs";
import PriceTable from "@/components/zatochka/PriceTable";
import MarketPriceTable from "@/components/services/MarketPriceTable";
import CTA from "@/components/services/CTA";
import ServiceForm from "@/components/services/ServiceForm";
import { SERVICE_CITIES, SERVICE_LIST } from "@/data/services";
import { MARKET_PRICE_GROUPS, MARKET_PRICE_NOTE } from "@/data/market-prices";
import { ZATOCHKA_PRICES } from "@/data/zatochka";
import { SITE_URL } from "@/data/contacts";
import { pageAlternates } from "@/lib/seo";

/**
 * Сводные цены (SDD 4.1, T-23).
 * По услугам с выездом показываем средние цены по рынку Беларуси
 * (data/market-prices.ts) с явной пометкой, что это ориентир, а не оферта.
 * Прайс мастерской — из data/zatochka.ts.
 */
const PATH = "/ceny/";

export const metadata: Metadata = {
  title: "Цены на бытовые услуги в Крупках и районе | krupki-master.by",
  description:
    "Средние цены по рынку Беларуси на электрику, декоративную штукатурку, отделочные работы, сантехнику и демонтаж. Ориентир «от», точная стоимость после замера.",
  alternates: pageAlternates(PATH),
  openGraph: {
    title: "Цены на бытовые услуги в Крупках и районе",
    description:
      "Средние цены по рынку Беларуси: электрика, декоративная штукатурка, отделочные работы, сантехника, демонтаж. Ориентир «от», точная стоимость после замера.",
    url: `${SITE_URL}${PATH}`,
    siteName: "Krupki Master",
    locale: "ru_BY",
    type: "website",
    images: [{ url: `${SITE_URL}/og_image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Цены на бытовые услуги в Крупках и районе",
    description: "Электрика, штукатурка, отделочные работы, заточка — сводные цены.",
    images: [`${SITE_URL}/og_image.png`],
  },
};

export default function CenyPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Главная", href: "/" },
    { name: "Цены" },
  ];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.href ? { item: `${SITE_URL}${c.href}` } : {}),
    })),
  };

  return (
    <div className="min-h-screen bg-[#0C0C0E] text-[#EDE8E0] antialiased overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />

      <main className="pt-24 md:pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-5">
          <Breadcrumbs items={breadcrumbs} />

          <section className="mb-8">
            <p className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#D97706] mb-4">
              Ориентир по рынку
            </p>
            <h1 className="text-[2rem] md:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.12] tracking-[-0.02em] mb-5 max-w-3xl">
              Цены на бытовые услуги в Крупках и районе
            </h1>
            <p className="text-[#6E7886] text-base md:text-lg leading-relaxed max-w-2xl">
              По услугам с выездом ниже — средние цены по открытым прайсам мастеров
              и бригад Беларуси. Это ориентир, чтобы понимать порядок сумм; точную
              стоимость мастер называет после замера. Прайс мастерской — точный.
            </p>
            {/* Дисклеймер вынесен в заметную плашку: средние цены рынка
                легко принять за прайс мастера и потом спорить о сумме на объекте. */}
            <div className="mt-6 border border-[#D97706]/30 bg-[#D97706]/[0.07] rounded-[3px] px-4 py-3.5 max-w-2xl">
              <p className="text-[#C8C2BA] text-sm leading-relaxed">
                {MARKET_PRICE_NOTE}
              </p>
            </div>
          </section>

          {MARKET_PRICE_GROUPS.map((group) => (
            <MarketPriceTable key={group.slug} group={group} />
          ))}

          <PriceTable items={ZATOCHKA_PRICES} title="Мастерская: заточка" />
          <p className="text-[#555560] text-sm -mt-6 mb-8">
            Доставка по Беларуси оплачивается отдельно по тарифу почты.{" "}
            <Link href="/zatochka/" className="text-[#D97706] hover:underline">
              Условия мастерской
            </Link>
          </p>

          <section aria-labelledby="from-what" className="py-8">
            <h2
              id="from-what"
              className="text-2xl md:text-3xl font-bold tracking-tight mb-6"
            >
              От чего зависит цена
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  t: "Объём работ",
                  d: "Одна розетка и десять розеток — разная логистика выезда и разное время.",
                },
                {
                  t: "Состояние основания",
                  d: "По стене, которая держится, и по осыпающейся штукатурке работа идёт по-разному.",
                },
                {
                  t: "Материалы",
                  d: "Свои материалы или согласованная закупка — стоимость считается отдельно от работы.",
                },
                {
                  t: "Доступ и условия",
                  d: "Работа в пустой квартире и в жилой с мебелью — разное время и разная аккуратность.",
                },
              ].map((x) => (
                <div
                  key={x.t}
                  className="border border-white/[0.07] bg-white/[0.02] rounded-[3px] p-5"
                >
                  <h3 className="text-[#EDE8E0] font-semibold text-sm mb-2">{x.t}</h3>
                  <p className="text-[#7A8494] text-sm leading-relaxed">{x.d}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="what-included" className="py-8">
            <h2
              id="what-included"
              className="text-2xl md:text-3xl font-bold tracking-tight mb-5"
            >
              Что входит в стоимость работы
            </h2>
            <ul className="space-y-2 max-w-3xl">
              {[
                "Выезд на замер и оценка объёма",
                "Согласование цены до начала работ",
                "Сам монтаж или отделка по согласованному этапу",
                "Уборка рабочего места после этапа",
              ].map((x) => (
                <li key={x} className="flex items-start gap-3 text-[#8B94A3] text-sm">
                  <span
                    className="mt-[7px] w-1 h-1 rounded-full bg-[#D97706] shrink-0"
                    aria-hidden="true"
                  />
                  {x}
                </li>
              ))}
            </ul>
            <p className="text-[#555560] text-sm leading-relaxed mt-4 max-w-3xl">
              Материалы и вывоз мусора считаются отдельно. Стоимость каждого этапа
              называется до начала работ.
            </p>
          </section>

          <CTA
            heading="Нужна точная цена?"
            text="Оставьте телефон — мастер приедет на замер и назовёт стоимость по вашему объёму."
          />

          <ServiceForm
            serviceOptions={[
              ...SERVICE_LIST.map((s) => s.serviceName),
              "Сантехника",
              "Демонтаж",
              "Заточка",
              "Другое",
            ]}
            cities={SERVICE_CITIES}
            heading="Запрос цены"
            note="Оставьте телефон — мастер уточнит объём и назовёт цену после замера. Без предоплаты."
            formId="ceny"
          />
        </div>
      </main>

      <Footer />
      <MobileCTA />
    </div>
  );
}
