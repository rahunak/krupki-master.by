import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import MobileCTA from "@/components/sections/MobileCTA";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/boards/Breadcrumbs";
import ServiceCard from "@/components/services/ServiceCard";
import ServiceZone from "@/components/services/ServiceZone";
import FAQBlock from "@/components/services/FAQBlock";
import ServiceForm from "@/components/services/ServiceForm";
import TrustBar from "@/components/services/TrustBar";
import CTA from "@/components/services/CTA";
import { SERVICE_CITIES, SERVICE_LIST, UPCOMING_SERVICES, CONTRACTORS_NOTE } from "@/data/services";
import { SITE_URL } from "@/data/contacts";
import { pageAlternates } from "@/lib/seo";

/**
 * Хаб «Бытовые услуги» (SDD 4.1, T-13).
 * Задача страницы — развести услуги и снять вопрос «а вы вообще это делаете?».
 * Гео в тексте и заголовках, но не в URL (запрет на гео-страницы).
 */
const PATH = "/uslugi/";

export const metadata: Metadata = {
  // Каталог забирает запрос «бытовые услуги в Крупках»: главная продаёт мастера
  // с выездом, /ceny/ — прайс. Так три страницы не конкурируют между собой.
  title: "Бытовые услуги в Крупках — электрика, сантехника, отделка",
  description:
    "Электрика, сантехника, декоративная штукатурка, отделочные работы. Крупки, Борисов, Толочин, Новолукомль. Цена после замера, выезд на объект.",
  alternates: pageAlternates(PATH),
  openGraph: {
    title: "Бытовые услуги в Крупках — электрика, сантехника, отделка",
    description:
      "Электрика, сантехника, декоративная штукатурка и отделочные работы по этапам. Выезд: Крупки, Борисов, Толочин, Новолукомль.",
    url: `${SITE_URL}${PATH}`,
    siteName: "Krupki Master",
    locale: "ru_BY",
    type: "website",
    images: [{ url: `${SITE_URL}/og_image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Бытовые услуги в Крупках — электрика, сантехника, отделка",
    description: "Электрика, сантехника, штукатурка и отделочные работы. Выезд на объект.",
    images: [`${SITE_URL}/og_image.png`],
  },
};

const FAQ = [
  {
    q: "В какие города вы выезжаете?",
    a: "Крупки, Борисов, Толочин, Новолукомль и населённые пункты в радиусе 50 км от Крупок. Выезд на замер и оценку объёма работ.",
  },
  {
    q: "Сколько стоит выезд и работа?",
    a: "Стоимость называем после замера: она зависит от объёма, состояния основания и материалов. Цены в таблице — ориентир «от», а не фиксированная смета.",
  },
  {
    q: "Кто выполняет работы?",
    a: "Электрику и сантехнику выполняет мастер. На ремонт, демонтаж и декоративную штукатурку привлекаются подрядчики — договорённость подтверждается до начала работ.",
  },
  {
    q: "Можно ли заказать только часть работ?",
    a: "Да. Отдельно штукатурка, отдельно электрика, отдельно плитка — обычный сценарий, если остальное делаете сами или другая бригада.",
  },
  {
    q: "Делаете ли ремонт под ключ?",
    a: "Нет. Бригады нет, поэтому мы не обещаем ремонт под ключ с фиксированной ценой и сроком. Работаем по этапам: этап согласовывается и принимается отдельно.",
  },
  {
    q: "Что с материалами?",
    a: "Можно закупить самому или согласовать закупку. Расход считаем по площади после замера.",
  },
];

export default function UslugiPage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Главная", href: "/" },
    { name: "Услуги" },
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

  // SDD 3.3: каталог услуг хаба (замена старого OfferCatalog «Услуги ручной заточки»)
  const catalogJsonLd = {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: "Бытовые услуги в Крупках и районе",
    url: `${SITE_URL}${PATH}`,
    itemListElement: SERVICE_LIST.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: `${s.serviceName} в Крупках и районе`,
        description: s.description,
        url: `${SITE_URL}${s.path}`,
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
              Выезд на объект · Крупки + 50 км
            </p>
            <h1 className="text-[2rem] md:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.12] tracking-[-0.02em] mb-5 max-w-3xl">
              Бытовые услуги в Крупках и районе
            </h1>
            <p className="text-[#6E7886] text-base md:text-lg leading-relaxed max-w-2xl mb-8">
              Электрика, сантехника, декоративная штукатурка и отделочные работы. Мастер приезжает
              на объект, осматривает его и называет цену до начала работ — без «сюрпризов»
              в конце.
            </p>
            <CTA variant="hero" orderLabel="Оставить заявку" />
            <TrustBar className="mt-10" />
          </section>

          <section aria-labelledby="services-heading" className="py-10">
            <h2
              id="services-heading"
              className="text-2xl md:text-3xl font-bold tracking-tight mb-6"
            >
              Что делаем
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SERVICE_LIST.map((s) => (
                <ServiceCard
                  key={s.slug}
                  href={s.path}
                  name={s.serviceName}
                  description={s.lead}
                  priceFrom={s.prices[0]?.priceFrom ?? null}
                  priceUnit={s.prices[0]?.unit}
                />
              ))}
            </div>

            <div className="mt-6 border border-white/[0.07] bg-white/[0.015] rounded-[3px] p-6">
              <p className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#7A8494] mb-3">
                Второй приоритет
              </p>
              <ul className="space-y-2">
                {UPCOMING_SERVICES.map((u) => (
                  <li key={u.slug} className="text-sm text-[#8B94A3]">
                    <span className="text-[#C8C2BA] font-medium">{u.name}.</span> {u.note}{" "}
                    <span className="text-[#555560]">
                      Уточните по телефону — скажем, когда сможем выехать.
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section aria-labelledby="prices-heading" className="py-10">
            <h2 id="prices-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-5">
              Сколько это стоит
            </h2>
            <div className="border border-white/[0.07] bg-white/[0.02] rounded-[3px] p-6 md:p-8">
              <p className="text-[#8B94A3] text-sm leading-relaxed max-w-2xl">
                На страницах услуг есть цены «от» — ориентир по средним ценам мастеров
                Беларуси. Точная стоимость зависит от объёма и состояния основания и
                называется после замера, до начала работ. Средние цены по рынку — в
                разделе «Цены».
              </p>
              <Link
                href="/ceny/"
                className="inline-flex items-center gap-2 mt-5 text-[#D97706] text-sm hover:text-[#F59E0B] transition-colors"
              >
                Средние цены и что входит в работу
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </section>

          <ServiceZone />

          <FAQBlock items={FAQ} pageUrl={`${SITE_URL}${PATH}`} />

          <CTA
            heading="Не знаете, с чего начать?"
            text="Позвоните или оставьте телефон — мастер скажет, нужен ли выезд и что делать в первую очередь."
          />

          <ServiceForm
            serviceOptions={[
              ...SERVICE_LIST.map((s) => s.serviceName),
              "Несколько работ сразу",
              "Другое",
            ]}
            cities={SERVICE_CITIES}
            heading="Заявка в «Бытовые услуги»"
            note={CONTRACTORS_NOTE}
            formId="uslugi-hub"
          />
        </div>
      </main>

      <Footer />
      <MobileCTA />
    </div>
  );
}
