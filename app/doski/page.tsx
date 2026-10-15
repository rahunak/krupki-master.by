import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import MobileCTA from "@/components/sections/MobileCTA";
import BoardOrderForm from "@/components/sections/BoardOrderForm";
import { BOARD_PAGES, PRODUCTS } from "@/data/boards";

const SITE_URL = "https://krupki-master.by";

export const metadata: Metadata = {
  title: "Изделия из дерева ручной работы на заказ | Krupki Master",
  description:
    "Разделочные доски, менажницы и подарочные наборы из массива дуба ручной работы. Изготовление под заказ с доставкой по всей Беларуси. Цены от 35 р.",
  keywords: [
    "изделия из дерева на заказ Беларусь",
    "разделочная доска дуб купить Беларусь",
    "менажница деревянная купить",
    "подарочный набор доска соусники",
    "деревянные изделия ручной работы Минск",
    "Крупки Мастер доски",
  ],
  alternates: { canonical: `${SITE_URL}/doski/` },
};

const ALL_PRODUCTS = [
  ...PRODUCTS.razdelochnye,
  ...PRODUCTS.menazhnitsy,
  ...PRODUCTS["podarochnye_nabory"],
];

export default function DoskiPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Изготовление изделий из дерева под заказ",
    description:
      "Ручное изготовление разделочных досок, менажниц и подарочных наборов из массива дуба с доставкой по всей Беларуси",
    provider: {
      "@type": "LocalBusiness",
      name: "Крупки Мастер",
      url: SITE_URL,
      telephone: "+375333123386",
      address: {
        "@type": "PostalAddress",
        addressCountry: "BY",
        addressLocality: "Прошика, Крупский район",
      },
    },
    areaServed: { "@type": "Country", name: "Беларусь" },
  };

  return (
    <div className="min-h-screen bg-[#0C0C0E] text-[#EDE8E0] antialiased overflow-x-hidden">
      <Header />
      {/* Temporary: mark pages as recipe: still working */}

      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Hero */}
        <section className="py-16 md:py-24 px-5 max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-[#EDE8E0]">
            Изделия из дерева
            <span className="block text-[#D97706] mt-2">ручной работы под заказ</span>
          </h1>
          <p className="text-[#8B94A3] text-lg leading-relaxed max-w-2xl mt-6">
            Мастерская в Крупках делает разделочные доски, менажницы и подарочные наборы
            из массива дуба. Каждое изделие вытачивается вручную, отделывается маслом и
            воском — и отправляется почтой по всей Беларуси, оплата при получении.
          </p>
          <div className="flex flex-wrap gap-x-8 gap-y-3 pt-10 border-t border-white/[0.07] mt-10">
            <span className="text-[#555560] text-sm">Массив дуба</span>
            <span className="text-[#555560] text-sm">Изготовление 3–7 дней</span>
            <span className="text-[#555560] text-sm">Доставка вся Беларусь</span>
            <span className="text-[#555560] text-sm">Оплата при получении</span>
          </div>
        </section>

        {/* Что делаем — 3 карточки-навигатора */}
        <section aria-labelledby="doski-pages" className="py-10 px-5 max-w-6xl mx-auto">
          <h2 id="doski-pages" className="text-3xl font-bold mb-8">
            Что делаем
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BOARD_PAGES.filter((p) => p.slug).map((p) => (
              <Link
                key={p.slug}
                href={`/doski/${p.slug}/`}
                className="block border border-white/[0.07] bg-white/[0.02] rounded-[3px] p-6 hover:border-[#D97706]/40 transition-colors"
              >
                <h3 className="text-xl font-semibold mb-3 text-[#F59E0B]">{p.title}</h3>
                <p className="text-[#7A8494]">{p.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* ВСЕ товары — таблица */}
        <section aria-labelledby="doski-prices" className="py-10 px-5 max-w-6xl mx-auto">
          <h2 id="doski-prices" className="text-3xl font-bold mb-8">
            Цены на изделия
          </h2>
          <div className="border border-white/[0.07] rounded-[3px] overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-left">
                  <th className="py-3 px-4 text-[#EDE8E0] font-semibold">Изделие</th>
                  <th className="py-3 px-4 text-[#EDE8E0] font-semibold">Размер</th>
                  <th className="py-3 px-4 text-[#EDE8E0] font-semibold">Цена</th>
                </tr>
              </thead>
              <tbody>
                {ALL_PRODUCTS.map((p) => (
                  <tr key={p.slug} className="border-b border-white/5 last:border-0">
                    <td className="py-3 px-4 text-[#C8C2BA]">{p.name}</td>
                    <td className="py-3 px-4 text-[#7A8494]">{p.size}</td>
                    <td className="py-3 px-4 text-[#F59E0B] font-semibold whitespace-nowrap">
                      {p.priceFrom}–{p.priceTo} р.
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[#333337] text-xs mt-3">
            Цена зависит от размера и оттенка дерева. Называем точную цену после заявки,
            до изготовления — без сюрпризов.
          </p>
        </section>

        {/* Гарантия */}
        <section aria-labelledby="doski-guarantee" className="py-10 px-5 max-w-6xl mx-auto">
          <h2 id="doski-guarantee" className="text-3xl font-bold mb-6">
            Гарантия
          </h2>
          <p className="text-[#8B94A3] leading-relaxed max-w-3xl">
            Каждое изделие мастер проверяет лично перед отправкой. Если при получении
            обнаружится производственный дефект (трещина, недошлифовка, отслоение) —
            сделаем замену или переделку. Если посылка пришла повреждённой при доставке —
            свяжитесь с нами, разберёмся и решим это. <strong className="text-[#C8C2BA]">
              Оплата наложенным платежом</strong> — вы осматриваете изделие прямо в отделении
            почты перед оплатой.
          </p>
        </section>

        <BoardOrderForm />
      </main>

      <Footer />
      <MobileCTA />
    </div>
  );
}
