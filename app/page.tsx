import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/header/Header";
import Hero from "@/components/sections/Hero";
import Footer from "@/components/footer/Footer";
import MobileCTA from "@/components/sections/MobileCTA";
import ServiceCard from "@/components/services/ServiceCard";
import FAQBlock from "@/components/services/FAQBlock";
import ServiceForm from "@/components/services/ServiceForm";
import ServiceZone from "@/components/services/ServiceZone";
import { SERVICE_CITIES, SERVICE_LIST } from "@/data/services";
import { SITE_URL } from "@/data/contacts";
import { pageAlternates } from "@/lib/seo";

/**
 * Главная (SDD 4.1, 7.3, T-20).
 * Главный экран продаёт заказ конкретных услуг: электрика, штукатурка,
 * отделка. Мастерская (заточка, дерево) живёт на отдельных страницах
 * /zatochka/ и /doski/ и на главной не дублируется.
 */
export const metadata: Metadata = {
  // Главная целится в исполнителя («мастер с выездом»), а каталог — в «бытовые
  // услуги» на /uslugi/ и прайс-интент на /ceny/: иначе три страницы конкурируют
  // за один запрос и поисковик выбирает случайную.
  title: "Мастер с выездом в Крупках — электрика и отделка",
  description:
    "Электрика, сантехника и отделка в Крупках и 50 км. Мастер приедет на объект и назовёт цену до начала работ. Без предоплаты.",
  alternates: pageAlternates("/"),
  openGraph: {
    title: "Мастер с выездом в Крупках — электрика и отделка",
    description:
      "Электрика, сантехника и отделка. Мастер приедет на объект и назовёт цену до начала работ. Крупки, Борисов, Толочин, Новолукомль.",
    url: SITE_URL,
    siteName: "Krupki Master",
    locale: "ru_BY",
    type: "website",
    images: [{ url: `${SITE_URL}/og_image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Мастер с выездом в Крупках — электрика и отделка",
    description: "Электрика, сантехника и отделка в Крупках. Цена до начала работ, без предоплаты.",
    images: [`${SITE_URL}/og_image.png`],
  },
};

const HOME_FAQ = [
  {
    q: "Куда вы выезжаете?",
    a: "Крупки, Борисов, Толочин, Новолукомль и населённые пункты в радиусе 50 км от Крупок. Выезд на замер и оценку объёма работ.",
  },
  {
    q: "Сколько стоит работа?",
    a: "Стоимость называем после замера: она зависит от объёма, состояния основания и материалов. Цены «от» на страницах услуг — ориентир, а не смета.",
  },
  {
    q: "Кто выполняет работы?",
    a: "Электрику и сантехнику выполняет мастер. На ремонт, демонтаж и декоративную штукатурку привлекаются подрядчики — договорённость подтверждается до начала работ.",
  },
  {
    q: "Делаете ли ремонт под ключ?",
    a: "Нет. Бригады нет, поэтому ремонт под ключ с фиксированной ценой и сроком мы не обещаем. Работаем по этапам: каждый этап согласовывается и принимается отдельно.",
  },
  {
    q: "Можно ли заказать только одну услугу?",
    a: "Да. Отдельно электрика, отдельно штукатурка, отдельно отделочные работы — обычный сценарий, если остальное делаете сами или другая бригада.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0C0C0E] text-[#EDE8E0] antialiased overflow-x-hidden">
      <Header />

      <main>
        <Hero />

        {/* Услуги — основное направление главной */}
        <section id="services" className="py-14 border-t border-white/[0.06]">
          <div className="max-w-6xl mx-auto px-5">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 mb-9">
              <div>
                <p className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#D97706] mb-3">
                  Услуги с выездом
                </p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Что можно заказать
                </h2>
              </div>
              <p className="text-[#555560] text-sm leading-relaxed md:text-right max-w-[260px]">
                Можно заказать одну услугу или несколько.
                <br />
                Цену называем после замера.
              </p>
            </div>

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

            <div className="mt-6">
              <Link
                href="/uslugi/"
                className="inline-flex items-center gap-2 text-[#D97706] text-sm hover:text-[#F59E0B] transition-colors"
              >
                Все услуги и условия
                <ArrowRight size={14} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-5 py-6">
          <ServiceZone />
        </div>

        <div className="max-w-6xl mx-auto px-5">
          <FAQBlock items={HOME_FAQ} pageUrl={SITE_URL} />

          <ServiceForm
            serviceOptions={[
              "Электрика",
              "Сантехника",
              "Декоративная штукатурка",
              "Отделочные работы",
              "Другое",
            ]}
            cities={SERVICE_CITIES}
            heading="Оставить заявку"
            note="Оставьте телефон — мастер свяжется в течение 2 часов, уточнит детали и назовёт цену. Без предоплаты до замера."
            formId="home"
          />
        </div>
      </main>

      <Footer />
      <MobileCTA />
    </div>
  );
}
