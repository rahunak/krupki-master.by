import Image from "next/image";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import MobileCTA from "@/components/sections/MobileCTA";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/boards/Breadcrumbs";
import CTA from "./CTA";
import ServiceZone from "./ServiceZone";
import PriceBlock from "./PriceBlock";
import FAQBlock from "./FAQBlock";
import ServiceForm from "./ServiceForm";
import TrustBar from "./TrustBar";
import WorkGallery from "./WorkGallery";
import { SITE_URL } from "@/data/contacts";
import {
  CONTRACTORS_NOTE,
  SERVICE_CITIES,
  SERVICES,
  type Service,
} from "@/data/services";
import { worksByService } from "@/data/works";

/**
 * Шаблон страницы услуги (SDD 4.1, 5, T-12).
 *
 * Обязательные блоки по SDD: что делаем · цены · сроки · зона выезда ·
 * примеры работ · FAQ · форма · телефон. Телефон — на первом экране
 * (у электрики и сантехники интент аварийный).
 */
export default function ServicePageLayout({ service }: { service: Service }) {
  const url = `${SITE_URL}${service.path}`;
  const works = worksByService(service.slug);

  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Главная", href: "/" },
    { name: "Услуги", href: "/uslugi/" },
    { name: `${service.serviceName} в Крупках` },
  ];

  // SDD 3.3: Service + BreadcrumbList. price/offers выводим только при
  // согласованной цене — null-цена в разметку не попадает.
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.serviceName} в Крупках и районе`,
    serviceType: service.serviceName,
    description: service.description,
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
    areaServed: SERVICE_CITIES.map((city) => ({ "@type": "City", name: city })),
    ...(service.prices.some((p) => p.priceFrom !== null)
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "BYN",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: Math.min(
                ...service.prices
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

  const otherServices = Object.values(SERVICES).filter((s) => s.slug !== service.slug);

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

          {/* Первый экран: H1 + телефон */}
          <section className="mb-12">
            <p className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#D97706] mb-4">
              Услуга · выезд на объект
            </p>
            <h1 className="text-[2rem] md:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.12] tracking-[-0.02em] mb-5 max-w-3xl">
              {service.h1}
            </h1>
            <p className="text-[#6E7886] text-base md:text-lg leading-relaxed max-w-2xl mb-8">
              {service.lead}
            </p>
            <CTA variant="hero" orderLabel="Оставить заявку" />
            <TrustBar className="mt-10" />
          </section>

          {/* Иллюстрация услуги. Это не портфолио: подпись прямо говорит,
              что фото показывает вид работ, а не выполненный объект (SDD 4.3). */}
          <figure className="mb-6">
            <div className="overflow-hidden rounded-[3px] border border-white/[0.07]">
              <Image
                src={service.image}
                alt={service.imageAlt}
                width={1600}
                height={1000}
                sizes="(max-width: 1152px) 100vw, 1104px"
                className="w-full h-auto object-cover"
              />
            </div>
            <figcaption className="text-[#3D3D42] text-xs mt-2">
              Иллюстрация вида работ, а не пример выполненного объекта.
            </figcaption>
          </figure>

          {/* Что делаем */}
          <section aria-labelledby="what-heading" className="py-10">
            <h2
              id="what-heading"
              className="text-2xl md:text-3xl font-bold tracking-tight mb-6"
            >
              Что делаем
            </h2>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
              {service.whatWeDo.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[#8B94A3] text-sm leading-relaxed">
                  <span
                    className="mt-[7px] w-1 h-1 rounded-full bg-[#D97706] shrink-0"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Когда вызывать */}
          <section aria-labelledby="reasons-heading" className="py-10">
            <h2
              id="reasons-heading"
              className="text-2xl md:text-3xl font-bold tracking-tight mb-6"
            >
              Когда нужен мастер
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {service.reasons.map((r) => (
                <p
                  key={r}
                  className="border border-white/[0.07] bg-white/[0.02] rounded-[3px] p-4 text-[#8B94A3] text-sm leading-relaxed"
                >
                  {r}
                </p>
              ))}
            </div>
          </section>

          <PriceBlock items={service.prices} title={`Цены: ${service.serviceName.toLowerCase()}`} />

          {/* Как проходит работа */}
          <section aria-labelledby="steps-heading" className="py-10">
            <h2
              id="steps-heading"
              className="text-2xl md:text-3xl font-bold tracking-tight mb-6"
            >
              Как проходит работа
            </h2>
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {service.steps.map((s, i) => (
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
            <p className="text-[#555560] text-xs leading-relaxed mt-5 max-w-3xl">
              Сроки называем после замера: они зависят от объёма и от того, сколько
              сохнет основание. Фиксированную дату до осмотра не обещаем.
            </p>
          </section>

          <WorkGallery
            works={works}
            emptyText={`Фотографии объектов по этой услуге добавляем по мере съёмки. Показывать стоковые или чужие работы считаем неправильным — примеры по вашей задаче покажем при обращении.`}
          />

          <ServiceZone />

          <FAQBlock items={service.faq} pageUrl={url} title="Вопросы по услуге" />

          <CTA
            heading="Нужен выезд мастера?"
            text="Оставьте телефон — мастер свяжется, уточнит задачу и назовёт цену до начала работ."
          />

          <ServiceForm
            serviceOptions={[
              service.serviceName,
              ...otherServices.map((s) => s.serviceName),
              "Сантехника",
              "Другое",
            ]}
            defaultService={service.serviceName}
            cities={SERVICE_CITIES}
            heading="Заявка на выезд"
            note={CONTRACTORS_NOTE}
            formId={`usluga-${service.slug}`}
          />

          {/* Перелинковка: R-05 — разводим услуги по интенту */}
          <section aria-labelledby="other-heading" className="pt-6 pb-10">
            <h2
              id="other-heading"
              className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#D97706] mb-5"
            >
              Другие услуги
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {otherServices.map((s) => (
                <a
                  key={s.slug}
                  href={s.path}
                  className="text-[#8B94A3] text-sm hover:text-[#D97706] transition-colors"
                >
                  {s.serviceName} →
                </a>
              ))}
              <a
                href="/uslugi/"
                className="text-[#8B94A3] text-sm hover:text-[#D97706] transition-colors"
              >
                Все услуги →
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
