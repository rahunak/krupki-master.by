import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Package, Truck, CreditCard, MapPin } from "lucide-react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import MobileCTA from "@/components/sections/MobileCTA";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/boards/Breadcrumbs";
import PriceTable from "@/components/zatochka/PriceTable";
import FAQBlock from "@/components/services/FAQBlock";
import ServiceForm from "@/components/services/ServiceForm";
import CTA from "@/components/services/CTA";
import { DELIVERY_STEPS, ZATOCHKA_FAQ, ZATOCHKA_PAGES, ZATOCHKA_PRICES } from "@/data/zatochka";
import { SITE_URL } from "@/data/contacts";
import { pageAlternates } from "@/lib/seo";

/**
 * Хаб мастерской (SDD 2.2, T-18).
 * Сюда перенесён весь контент заточки, который до ребрендинга жил на главной:
 * цены, порядок работы, доставка, FAQ. Главная больше не про заточку (T-20),
 * поэтому потеря контента здесь была бы потерей и трафика, и доверия (R-03).
 */
const PATH = "/zatochka/";

export const metadata: Metadata = {
  title: "Заточка ножей и инструмента — мастерская в Крупках | krupki-master.by",
  description:
    "Ручная заточка ножей, цепей бензопил и инструмента в Крупках. Отправка Белпочтой и Европочтой по всей Беларуси, оплата при получении. Цены от 4 BYN.",
  alternates: pageAlternates(PATH),
  openGraph: {
    title: "Заточка ножей и инструмента — мастерская в Крупках",
    description:
      "Ручная заточка ножей, цепей бензопил и инструмента. Отправка по всей Беларуси, оплата при получении.",
    url: `${SITE_URL}${PATH}`,
    siteName: "Krupki Master",
    locale: "ru_BY",
    type: "website",
    images: [{ url: `${SITE_URL}/og_image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Заточка ножей и инструмента — мастерская в Крупках",
    description: "Ручная заточка, отправка по всей Беларуси, оплата при получении.",
    images: [`${SITE_URL}/og_image.png`],
  },
};

const PAGES = Object.values(ZATOCHKA_PAGES);

export default function ZatochkaPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Главная", href: "/" },
    { name: "Мастерская" },
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

  const catalogJsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Услуги мастерской: заточка и деревянные изделия",
    url: `${SITE_URL}${PATH}`,
    itemListElement: PAGES.map((p) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: p.serviceName,
        description: p.description,
        url: `${SITE_URL}${p.path}`,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-[#0C0C0E] text-[#EDE8E0] antialiased overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogJsonLd) }}
      />
      <Header />

      <main className="pt-24 md:pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-5">
          <Breadcrumbs items={breadcrumbs} />

          <section className="mb-12">
            <p className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#D97706] mb-4">
              Мастерская · отправка по всей Беларуси
            </p>
            <h1 className="text-[2rem] md:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.12] tracking-[-0.02em] mb-5 max-w-3xl">
              Заточка ножей и инструмента — мастерская в Крупках
            </h1>
            <p className="text-[#6E7886] text-base md:text-lg leading-relaxed max-w-2xl mb-8">
              Ручная заточка кухонных и охотничьих ножей, цепей бензопил, столярного
              и садового инструмента. Отправляете инструмент почтой — получаете обратно
              заточенным, с оплатой при получении.
            </p>
            <CTA
              variant="hero"
              orderLabel="Оставить заявку"
            />
            <ul className="flex flex-wrap gap-x-8 gap-y-3 pt-8 mt-8 border-t border-white/[0.07]">
              {[
                { icon: Package, label: "Ручная работа, без перегрева кромки" },
                { icon: Truck, label: "Белпочта и Европочта по всей Беларуси" },
                { icon: CreditCard, label: "Наложенный платёж при получении" },
                { icon: MapPin, label: "Мастерская: Крупский район, д. Прошика" },
              ].map((t) => (
                <li key={t.label} className="flex items-center gap-2 text-[13px] text-[#555560]">
                  <t.icon size={13} className="text-[#D97706]" aria-hidden="true" />
                  {t.label}
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="zatochka-pages" className="py-10">
            <h2
              id="zatochka-pages"
              className="text-2xl md:text-3xl font-bold tracking-tight mb-6"
            >
              Что точим
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PAGES.map((p) => (
                <Link
                  key={p.slug}
                  href={p.path}
                  className="group border border-white/[0.07] bg-white/[0.02] rounded-[3px] p-6 hover:border-[#D97706]/40 transition-colors flex flex-col"
                >
                  <h3 className="text-lg font-semibold text-[#EDE8E0] mb-2 group-hover:text-[#F59E0B] transition-colors">
                    {p.serviceName}
                  </h3>
                  <p className="text-[#7A8494] text-sm leading-relaxed mb-5">{p.lead}</p>
                  <span className="mt-auto inline-flex items-center gap-2 text-[#C8C2BA] text-sm">
                    Подробнее
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              ))}
            </div>
          </section>

          <PriceTable items={ZATOCHKA_PRICES} />

          <section aria-labelledby="how-heading" className="py-10">
            <h2 id="how-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
              Как это работает
            </h2>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {DELIVERY_STEPS.map((s, i) => (
                <li
                  key={s.title}
                  className="border border-white/[0.07] bg-white/[0.02] rounded-[3px] p-5"
                >
                  <span className="font-mono text-[#D97706] text-xs font-bold">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[#EDE8E0] font-semibold text-sm mt-2 mb-2">{s.title}</h3>
                  <p className="text-[#7A8494] text-sm leading-relaxed">{s.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="delivery-heading" className="py-10">
            <h2
              id="delivery-heading"
              className="text-2xl md:text-3xl font-bold tracking-tight mb-5"
            >
              Доставка и оплата
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="border border-white/[0.07] bg-white/[0.02] rounded-[3px] p-6">
                <h3 className="text-[#EDE8E0] font-semibold text-sm mb-2">Куда отправлять</h3>
                <p className="text-[#7A8494] text-sm leading-relaxed">
                  Беларусь, Минская область, Крупский район, д. Прошика,
                  ул. Молодёжная, 1. Отправляйте Белпочтой или Европочтой —
                  уведомите о отправке, чтобы посылка не ждала в отделении.
                </p>
              </div>
              <div className="border border-white/[0.07] bg-white/[0.02] rounded-[3px] p-6">
                <h3 className="text-[#EDE8E0] font-semibold text-sm mb-2">Как вернём</h3>
                <p className="text-[#7A8494] text-sm leading-relaxed">
                  Тем же способом, каким отправили. Белпочтой — можно наложенным
                  платежом: вы платите при получении, когда инструмент уже в руках.
                  Фото «до/после» присылаем в Viber до оплаты.
                </p>
              </div>
            </div>
          </section>

          <FAQBlock items={ZATOCHKA_FAQ} pageUrl={`${SITE_URL}${PATH}`} />

          <section className="py-8">
            <Link
              href="/doski/"
              className="group inline-flex items-center gap-3 border border-white/[0.07] bg-white/[0.02] rounded-[3px] px-6 py-5 hover:border-[#D97706]/40 transition-colors"
            >
              <span>
                <span className="block text-[#EDE8E0] font-semibold text-sm">
                  Изделия из дерева
                </span>
                <span className="block text-[#7A8494] text-sm mt-1">
                  Разделочные доски и менажницы из массива дуба — от 35 BYN
                </span>
              </span>
              <ArrowRight
                size={16}
                className="text-[#D97706] group-hover:translate-x-1 transition-transform shrink-0"
                aria-hidden="true"
              />
            </Link>
          </section>

          <ServiceForm
            serviceOptions={[
              ...PAGES.map((p) => p.serviceName),
              "Другое",
            ]}
            showCity={false}
            heading="Отправить инструмент на заточку"
            note="Оставьте телефон — мастер скажет, как отправить инструмент и когда ждать результат."
            formId="zatochka-hub"
          />
        </div>
      </main>

      <Footer />
      <MobileCTA />
    </div>
  );
}
