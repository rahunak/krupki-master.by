import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import MobileCTA from "@/components/sections/MobileCTA";
import Breadcrumbs, { type BreadcrumbItem } from "@/components/boards/Breadcrumbs";
import ServiceZone from "@/components/services/ServiceZone";
import CTA from "@/components/services/CTA";
import ServiceForm from "@/components/services/ServiceForm";
import { CONTRACTORS_NOTE, SERVICE_CITIES, SERVICE_LIST } from "@/data/services";
import { SITE_URL } from "@/data/contacts";
import { pageAlternates } from "@/lib/seo";

/**
 * О мастере (SDD 4.1, T-24). Задача — доверие без выдуманных цифр:
 * кто именно приедет, что делает сам, кого привлекает.
 */
const PATH = "/o-mastere/";

export const metadata: Metadata = {
  title: "О мастере — кто выполняет работы | krupki-master.by",
  description:
    "Кто выполняет работы, опыт, как привлекаются подрядчики и как согласуется цена. Крупки и 50 км: Крупки, Борисов, Толочин, Новолукомль.",
  alternates: pageAlternates(PATH),
  openGraph: {
    title: "О мастере — кто выполняет работы",
    description: "Кто приедет на объект, что делает сам, кого привлекает. Крупки и 50 км.",
    url: `${SITE_URL}${PATH}`,
    siteName: "Krupki Master",
    locale: "ru_BY",
    type: "website",
    images: [{ url: `${SITE_URL}/og_image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "О мастере — кто выполняет работы",
    description: "Кто приедет на объект, что делает сам, кого привлекает.",
    images: [`${SITE_URL}/og_image.png`],
  },
};

export default function OMasterePage() {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Главная", href: "/" },
    { name: "О мастере" },
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
              О мастере
            </p>
            <h1 className="text-[2rem] md:text-4xl lg:text-[2.6rem] font-extrabold leading-[1.12] tracking-[-0.02em] mb-5 max-w-3xl">
              Кто приедет на объект и что делает сам
            </h1>
            <p className="text-[#6E7886] text-base md:text-lg leading-relaxed max-w-2xl mb-8">
              Мастерская в Крупках: здесь точат инструмент и делают деревянную посуду,
              а с недавнего времени выполняют бытовые работы с выездом на объект.
              Ниже — без рекламных обещаний: кто именно работает, что заказывать
              можно, а что нет.
            </p>
            <CTA variant="hero" orderLabel="Оставить заявку" />
          </section>

          <section aria-labelledby="who" className="py-10">
            <h2 id="who" className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
              Что мастер делает сам
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  t: "Электрика",
                  d: "Розетки, освещение, щиты, поиск неисправностей. Работы выполняет мастер, без передачи на сторону.",
                },
                {
                  t: "Сантехника",
                  d: "Замена смесителей, подключение техники, несложная разводка — тоже своими руками.",
                },
                {
                  t: "Заточка",
                  d: "Ручная заточка ножей, цепей и инструмента в мастерской, с отправкой по Беларуси.",
                },
                {
                  t: "Деревянная посуда",
                  d: "Разделочные доски и менажницы из массива дуба под заказ.",
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

          <section aria-labelledby="contractors" className="py-10">
            <h2
              id="contractors"
              className="text-2xl md:text-3xl font-bold tracking-tight mb-5"
            >
              Кого привлекаем и как это устроено
            </h2>
            <p className="text-[#8B94A3] text-sm leading-relaxed max-w-3xl mb-5">
              {CONTRACTORS_NOTE} Это значит: заявку принимает мастер, он же называет
              цену и отвечает за результат. Подрядчик не приходит «сам по себе» —
              объём и срок согласуются заранее.
            </p>
            <div className="border border-white/[0.07] bg-white/[0.02] rounded-[3px] p-6 max-w-3xl">
              <p className="text-[#EDE8E0] font-semibold text-sm mb-2">
                Чего мы не делаем
              </p>
              <p className="text-[#7A8494] text-sm leading-relaxed">
                Не обещаем «ремонт под ключ» с фиксированной ценой и сроком: бригады
                нет. Работаем по этапам — этап согласовывается и принимается отдельно,
                и на любом шаге можно остановиться.
              </p>
            </div>
          </section>

          <section aria-labelledby="price" className="py-10">
            <h2 id="price" className="text-2xl md:text-3xl font-bold tracking-tight mb-5">
              Как согласуется цена
            </h2>
            <ol className="space-y-3 max-w-3xl">
              {[
                "Заявка: телефон и короткое описание задачи.",
                "Замер на объекте: объём, состояние основания, доступ.",
                "Цена и срок по этапам — до начала работ.",
                "Работа и приёмка этапа вместе с заказчиком.",
              ].map((x, i) => (
                <li key={x} className="flex items-start gap-3">
                  <span className="font-mono text-[#D97706] text-xs font-bold mt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[#8B94A3] text-sm leading-relaxed">{x}</span>
                </li>
              ))}
            </ol>
            <p className="text-[#555560] text-sm leading-relaxed mt-4 max-w-3xl">
              Цены «от» на страницах услуг — ориентир. Итоговая сумма зависит от объёма
              и материалов и фиксируется до начала работ. Подробнее — на странице{" "}
              <Link href="/ceny/" className="text-[#D97706] hover:underline">
                «Цены»
              </Link>
              .
            </p>
          </section>

          <ServiceZone />

          <section aria-labelledby="services" className="py-10">
            <h2 id="services" className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#D97706] mb-5">
              Услуги
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {SERVICE_LIST.map((s) => (
                <Link
                  key={s.slug}
                  href={s.path}
                  className="text-[#8B94A3] text-sm hover:text-[#D97706] transition-colors"
                >
                  {s.serviceName} →
                </Link>
              ))}
              <Link
                href="/zatochka/"
                className="text-[#8B94A3] text-sm hover:text-[#D97706] transition-colors"
              >
                Мастерская →
              </Link>
            </div>
          </section>

          <ServiceForm
            serviceOptions={[
              ...SERVICE_LIST.map((s) => s.serviceName),
              "Заточка",
              "Другое",
            ]}
            cities={SERVICE_CITIES}
            heading="Написать мастеру"
            note="Оставьте телефон — мастер свяжется и скажет, нужен ли выезд."
            formId="o-mastere"
          />
        </div>
      </main>

      <Footer />
      <MobileCTA />
    </div>
  );
}
