import type { Metadata } from "next";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import MobileCTA from "@/components/sections/MobileCTA";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/boards/Breadcrumbs";
import ServiceZone from "@/components/services/ServiceZone";
import ServiceForm from "@/components/services/ServiceForm";
import { SERVICE_CITIES, SERVICE_LIST } from "@/data/services";
import { PHONE_NUMBER, SITE_URL } from "@/data/contacts";
import { pageAlternates } from "@/lib/seo";

/**
 * Контакты и зона выезда (SDD 4.1, T-25).
 * Карта — ссылкой на Яндекс.Карты по адресу: внешний iframe без ключа API
 * нестабилен, а точные координаты мастерской владелец не подтверждал.
 */
const PATH = "/kontakty/";

export const metadata: Metadata = {
  title: "Контакты и зона выезда — Крупки + 50 км | krupki-master.by",
  description:
    "Телефон, зона выезда: Крупки, Борисов, Толочин, Новолукомль. Адрес мастерской, часы работы и как оставить заявку.",
  alternates: pageAlternates(PATH),
  openGraph: {
    title: "Контакты и зона выезда — Крупки + 50 км",
    description: "Телефон, зона выезда, адрес мастерской и часы работы.",
    url: `${SITE_URL}${PATH}`,
    siteName: "Krupki Master",
    locale: "ru_BY",
    type: "website",
    images: [{ url: `${SITE_URL}/og_image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Контакты и зона выезда — Крупки + 50 км",
    description: "Телефон, зона выезда, адрес мастерской и часы работы.",
    images: [`${SITE_URL}/og_image.png`],
  },
};

const ADDRESS = "Беларусь, Минская область, Крупский район, д. Прошика, ул. Молодёжная, 1";
const MAPS_URL = `https://yandex.by/maps/?text=${encodeURIComponent(
  "Крупский район, деревня Прошика, улица Молодёжная 1"
)}`;

export default function KontaktyPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Главная", href: "/" },
    { name: "Контакты" },
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

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: "Крупки Мастер",
    url: SITE_URL,
    telephone: PHONE_NUMBER,
    priceRange: "от 4 BYN",
    address: {
      "@type": "PostalAddress",
      streetAddress: "д. Прошика, ул. Молодёжная, 1",
      addressLocality: "Крупки",
      addressRegion: "Минская область",
      postalCode: "222033",
      addressCountry: "BY",
    },
    areaServed: SERVICE_CITIES.map((city) => ({ "@type": "City", name: city })),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "10:00",
        closes: "15:00",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0C0C0E] text-[#EDE8E0] antialiased overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <Header />

      <main className="pt-24 md:pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-5">
          <Breadcrumbs items={breadcrumbs} />

          <section className="mb-10">
            <p className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#D97706] mb-4">
              Контакты
            </p>
            <h1 className="text-[2rem] md:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.12] tracking-[-0.02em] mb-8 max-w-3xl">
              Контакты и зона выезда — Крупки + 50 км
            </h1>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="border border-white/[0.07] bg-white/[0.02] rounded-[3px] p-6">
                <p className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#7A8494] mb-3">
                  Телефон
                </p>
                <a
                  href={`tel:${PHONE_NUMBER}`}
                  className="text-[#EDE8E0] font-bold text-lg hover:text-[#D97706] transition-colors"
                >
                  +375 (25) 781-09-98
                </a>
                <p className="text-[#7A8494] text-sm mt-3 leading-relaxed">
                  Звонок или Viber. Для заявок с сайта — форма ниже.
                </p>
              </div>

              <div className="border border-white/[0.07] bg-white/[0.02] rounded-[3px] p-6">
                <p className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#7A8494] mb-3">
                  Адрес мастерской
                </p>
                <p className="text-[#C8C2BA] text-sm leading-relaxed">{ADDRESS}</p>
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-[#D97706] text-sm mt-3 hover:underline"
                >
                  Открыть на Яндекс.Картах →
                </a>
              </div>

              <div className="border border-white/[0.07] bg-white/[0.02] rounded-[3px] p-6">
                <p className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#7A8494] mb-3">
                  Часы работы
                </p>
                <p className="text-[#C8C2BA] text-sm leading-relaxed">
                  Пн–Пт: 09:00–18:00
                  <br />
                  Сб: 10:00–15:00
                  <br />
                  Вс: выходной
                </p>
              </div>
            </div>
          </section>

          <ServiceZone />

          <section aria-labelledby="how-to-order" className="py-10">
            <h2
              id="how-to-order"
              className="text-2xl md:text-3xl font-bold tracking-tight mb-5"
            >
              Как оставить заявку
            </h2>
            <ol className="space-y-3 max-w-2xl">
              {[
                "Позвоните или заполните форму ниже — нужен только телефон.",
                "Мастер уточнит задачу и скажет, нужен ли выезд.",
                "Согласуем цену и время. Предоплата до замера не нужна.",
              ].map((x, i) => (
                <li key={x} className="flex items-start gap-3">
                  <span className="font-mono text-[#D97706] text-xs font-bold mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[#8B94A3] text-sm leading-relaxed">{x}</span>
                </li>
              ))}
            </ol>
          </section>

          <ServiceForm
            serviceOptions={[
              ...SERVICE_LIST.map((s) => s.serviceName),
              "Заточка",
              "Другое",
            ]}
            cities={SERVICE_CITIES}
            heading="Заявка"
            note="Оставьте телефон — мастер свяжется и уточнит детали."
            formId="kontakty"
          />
        </div>
      </main>

      <Footer />
      <MobileCTA />
    </div>
  );
}
