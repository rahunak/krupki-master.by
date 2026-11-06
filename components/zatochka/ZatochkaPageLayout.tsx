import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import MobileCTA from "@/components/sections/MobileCTA";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/boards/Breadcrumbs";
import PriceTable from "./PriceTable";
import FAQBlock from "@/components/services/FAQBlock";
import ServiceForm from "@/components/services/ServiceForm";
import CTA from "@/components/services/CTA";
import { ZATOCHKA_PAGES, type ZatochkaPage } from "@/data/zatochka";
import { SITE_URL } from "@/data/contacts";

/**
 * Шаблон подстраницы мастерской (SDD 2.2, T-19).
 * Обязательные блоки: что точим · цены · FAQ · форма · телефон.
 */
export default function ZatochkaPageLayout({ page }: { page: ZatochkaPage }) {
  const url = `${SITE_URL}${page.path}`;

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Главная", href: "/" },
    { name: "Мастерская", href: "/zatochka/" },
    { name: page.serviceName },
  ];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${page.serviceName} в Крупках`,
    serviceType: page.serviceName,
    description: page.description,
    url,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: "Крупки Мастер",
      url: SITE_URL,
      telephone: "+375257810998",
      address: {
        "@type": "PostalAddress",
        streetAddress: "д. Прошика, ул. Молодёжная, 1",
        addressLocality: "Крупки",
        addressRegion: "Минская область",
        postalCode: "222033",
        addressCountry: "BY",
      },
    },
    // Заточка работает по всей стране за счёт почтовой пересылки,
    // а не выезда мастера — поэтому здесь Country, а не 4 города.
    areaServed: { "@type": "Country", name: "Беларусь" },
    ...(page.prices.some((p) => p.priceFrom !== null)
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "BYN",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: Math.min(
                ...page.prices
                  .map((p) => p.priceFrom)
                  .filter((p): p is number => p !== null)
              ),
              priceCurrency: "BYN",
            },
          },
        }
      : {}),
  };

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

  const otherPages = Object.values(ZATOCHKA_PAGES).filter((p) => p.slug !== page.slug);

  return (
    <div className="min-h-screen bg-[#0C0C0E] text-[#EDE8E0] antialiased overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />

      <main className="pt-24 md:pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-5">
          <Breadcrumbs items={breadcrumbs} />

          <section className="mb-12">
            <p className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#D97706] mb-4">
              Мастерская · отправка по Беларуси
            </p>
            <h1 className="text-[2rem] md:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.12] tracking-[-0.02em] mb-5 max-w-3xl">
              {page.h1}
            </h1>
            <p className="text-[#6E7886] text-base md:text-lg leading-relaxed max-w-2xl mb-8">
              {page.lead}
            </p>
            <CTA variant="hero" orderLabel="Оставить заявку" />
          </section>

          <section aria-labelledby="what-heading" className="py-10">
            <h2 id="what-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
              Что точим
            </h2>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {page.whatWeDo.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[#8B94A3] text-sm leading-relaxed"
                >
                  <span
                    className="mt-[7px] w-1 h-1 rounded-full bg-[#D97706] shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <PriceTable items={page.prices} />

          <FAQBlock items={page.faq} pageUrl={url} />

          <CTA
            heading="Готовы отправить инструмент?"
            text="Оставьте телефон — мастер скажет, как отправить и когда ждать результат. Инструкция по упаковке есть в блоге."
          />

          <ServiceForm
            serviceOptions={[page.serviceName, ...otherPages.map((p) => p.serviceName), "Другое"]}
            defaultService={page.serviceName}
            showCity={false}
            heading="Заявка в мастерскую"
            note="Отправка Белпочтой или Европочтой по всей Беларуси. Оплата при получении."
            formId={`zatochka-${page.slug}`}
          />

          <section className="pt-4 pb-10">
            <p className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#D97706] mb-4">
              Другие услуги мастерской
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {otherPages.map((p) => (
                <a
                  key={p.slug}
                  href={p.path}
                  className="text-[#8B94A3] text-sm hover:text-[#D97706] transition-colors"
                >
                  {p.serviceName} →
                </a>
              ))}
              <a
                href="/zatochka/"
                className="text-[#8B94A3] text-sm hover:text-[#D97706] transition-colors"
              >
                Мастерская →
              </a>
              <a
                href="/doski/"
                className="text-[#8B94A3] text-sm hover:text-[#D97706] transition-colors"
              >
                Изделия из дерева →
              </a>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <MobileCTA />
    </div>
  );
}
