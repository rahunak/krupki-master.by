import type { Metadata } from "next";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import MobileCTA from "@/components/sections/MobileCTA";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/boards/Breadcrumbs";
import WorkGallery from "@/components/services/WorkGallery";
import ServiceZone from "@/components/services/ServiceZone";
import ServiceForm from "@/components/services/ServiceForm";
import CTA from "@/components/services/CTA";
import { SERVICE_CITIES, SERVICE_LIST } from "@/data/services";
import { WORKS } from "@/data/works";
import { SITE_URL } from "@/data/contacts";
import { pageAlternates } from "@/lib/seo";

/**
 * Портфолио (SDD 4.1, T-22).
 *
 * Блокирующая зависимость: реальные фото объектов (T-09, владелец).
 * Пока их нет, страница работает как страница доверия и объясняет,
 * почему здесь нет стоковых фотографий (см. data/works.ts).
 *
 * До появления объектов страница закрыта от индексации и убрана из меню/sitemap:
 * пустое портфолио в выдаче и в навигации только теряет доверие.
 */
const PATH = "/raboty/";

export const metadata: Metadata = {
  title: "Наши работы — объекты в Крупках и районе | krupki-master.by",
  description:
    "Объекты, на которых работал мастер: электрика, декоративная штукатурка, отделочные работы. Крупки, Борисов, Толочин, Новолукомль.",
  robots: { index: false, follow: true },
  alternates: pageAlternates(PATH),
  openGraph: {
    title: "Наши работы — объекты в Крупках и районе",
    description:
      "Электрика, декоративная штукатурка, отделочные работы. Крупки, Борисов, Толочин, Новолукомль.",
    url: `${SITE_URL}${PATH}`,
    siteName: "Krupki Master",
    locale: "ru_BY",
    type: "website",
    images: [{ url: `${SITE_URL}/og_image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Наши работы — объекты в Крупках и районе",
    description: "Электрика, штукатурка, отделочные работы — объекты в Крупках и районе.",
    images: [`${SITE_URL}/og_image.png`],
  },
};

export default function RabotyPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Главная", href: "/" },
    { name: "Работы" },
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

          <section className="mb-10">
            <p className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#D97706] mb-4">
              Портфолио
            </p>
            <h1 className="text-[2rem] md:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.12] tracking-[-0.02em] mb-5 max-w-3xl">
              Наши работы — объекты в Крупках и районе
            </h1>
            <p className="text-[#6E7886] text-base md:text-lg leading-relaxed max-w-2xl mb-8">
              {WORKS.length > 0
                ? "Реальные объекты: что было до, что сделали и сколько заняло. Города — из зоны выезда."
                : "Портфолио пополняется: фотографируем каждый объект, но показываем только свои работы. Чужие проекты и стоковые фото здесь не появятся."}
            </p>
            <CTA variant="hero" orderLabel="Обсудить свою задачу" />
          </section>

          <WorkGallery
            works={WORKS}
            title={WORKS.length > 0 ? "Объекты" : "Фотографии объектов"}
            emptyText="Пока здесь нет фотографий: владелец собирает снимки «до/после» по объектам. Как только они появятся — добавим их с городом, объёмом и сроком. Если нужен пример по конкретной задаче (например, штукатурка в комнате), расскажем о похожих случаях по телефону."
          />

          <ServiceZone />

          <ServiceForm
            serviceOptions={[
              ...SERVICE_LIST.map((s) => s.serviceName),
              "Сантехника",
              "Другое",
            ]}
            cities={SERVICE_CITIES}
            heading="Обсудить объект"
            note="Оставьте телефон — мастер свяжется, уточнит задачу и скажет, нужен ли выезд."
            formId="raboty"
          />
        </div>
      </main>

      <Footer />
      <MobileCTA />
    </div>
  );
}
