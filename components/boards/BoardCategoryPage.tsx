import Image from "next/image";
import Link from "next/link";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import MobileCTA from "@/components/sections/MobileCTA";
import BoardOrderForm from "@/components/sections/BoardOrderForm";
import { PRODUCTS, BOARD_PAGES, HERO_PHOTOS, GIFT_HIDDEN, type BoardProduct } from "@/data/boards";
import ProductPhotoGallery from "./ProductPhotoGallery";
import Breadcrumbs, { type BreadcrumbItem } from "./Breadcrumbs";

/**
 * Единый шаблон товарной страницы направления «Изделия из дерева».
 * Живёт внутри page.tsx — metadata экспортирует сам page.tsx.
 */

const SITE_URL = "https://krupki-master.by";

function formatPrice(p: BoardProduct): string {
  return p.priceFrom === p.priceTo ? `${p.priceFrom} р.` : `${p.priceFrom}–${p.priceTo} р.`;
}

export interface BoardPageProps {
  category: "razdelochnye" | "menazhnitsy" | "podarochnye_nabory";
  h1: string;
  h1Accent: string;
  heroText: string;
  jsonLdType: "Product" | "Service";
  whyBlocks: { title: string; text: string }[];
  faq: { q: string; a: string }[];
}

export default function BoardCategoryPage(props: BoardPageProps) {
  const products = PRODUCTS[props.category];
  const jpSlug = BOARD_PAGES.find((p) => p.slug === props.category)?.slug ?? props.category;
  const heroPhoto = HERO_PHOTOS[props.category];
  const pageUrl = `${SITE_URL}/doski/${jpSlug}/`;
  const imageUrl = (path: string) => `${SITE_URL}/${path}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": props.jsonLdType,
    name: props.h1,
    description: props.heroText,
    url: pageUrl,
    image: [imageUrl(heroPhoto), ...products.flatMap((p) => (p.photos ?? []).slice(0, 1).map(imageUrl)).slice(0, 4)],
    ...(props.jsonLdType === "Product"
      ? {
        offers: products.map((p) => ({
          "@type": "Offer",
          name: p.name,
          description: p.size,
          priceCurrency: "BYN",
          price: p.priceFrom,
          availability: "https://schema.org/PreOrder",
          url: pageUrl,
        })),
      }
      : {}),
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

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntityOfPage: pageUrl,
    mainEntity: props.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // TEMP-GIFT: подарочные наборы временно скрыты — см. GIFT_HIDDEN в data/boards.ts
  const otherPages = BOARD_PAGES.filter(
    (p) => p.slug && p.slug !== props.category && !(GIFT_HIDDEN && p.slug === "podarochnye_nabory"),
  );

  // Хлебные крошки: Главная / Изделия из дерева / <категория>
  const categoryTitle = BOARD_PAGES.find((p) => p.slug === props.category)?.title ?? props.h1;
  const breadcrumbs: BreadcrumbItem[] = [
    { name: "Главная", href: "/" },
    { name: "Изделия из дерева", href: "/doski/" },
    { name: categoryTitle },
  ];
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      // Текущая страница без item — валидно для Google
      ...(c.href ? { item: `${SITE_URL}${c.href}` } : {}),
    })),
  };

  return (
    <div className="min-h-screen bg-[#0C0C0E] text-[#EDE8E0] antialiased overflow-x-hidden">
      <Header />

      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        {/* Hero + фото категории */}
        <section className="py-16 md:py-24 px-5 max-w-6xl mx-auto">
          <Breadcrumbs items={breadcrumbs} />
          <div className="grid md:grid-cols-[7fr_5fr] gap-10 items-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                {props.h1}
                <span className="block text-[#D97706] mt-2">{props.h1Accent}</span>
              </h1>
              <p className="text-[#8B94A3] text-lg leading-relaxed mt-6">{props.heroText}</p>
            </div>
            <div className="relative aspect-[5/5.2] max-h-[520px] mx-auto w-full rounded-[3px] overflow-hidden border border-white/[0.08] bg-[#191613]">
              <Image
                src={`/${heroPhoto}`}
                alt={props.h1}
                fill
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 42vw, 45rem"
                className="object-contain"
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 pt-10 border-t border-white/[0.07] mt-10">
            <span className="text-[#555560] text-sm">Массив дуба</span>
            <span className="text-[#555560] text-sm">Изготовление 3–7 дней</span>
            <span className="text-[#555560] text-sm">Доставка вся Беларусь</span>
            <span className="text-[#555560] text-sm">Оплата при получении</span>
          </div>
        </section>

        {/* Товары категории */}
        <section
          aria-labelledby={`products-${props.category}`}
          className="py-10 px-5 max-w-6xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-8">Изделия и цены</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <article
                key={p.slug}
                className="border border-white/[0.07] bg-white/[0.02] rounded-[3px] p-6 pt-0"
              >
                {p.photos && p.photos.length > 0 && (
                  <ProductPhotoGallery photos={p.photos} labels={p.labels} altBase={p.name} />
                )}
                <h3 className="text-xl font-semibold mb-2 text-[#F59E0B]">{p.name}</h3>
                <p className="text-[#7A8494] text-sm mb-3">{p.size}</p>
                {p.includes && <p className="text-[#7A8494] text-xs mb-3">{p.includes}</p>}
                <p className="text-[#EDE8E0] font-bold text-xl">{formatPrice(p)}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Почему дуб */}
        <section aria-labelledby={`why-${props.category}`} className="py-10 px-5 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Почему дуб и ручная работа</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {props.whyBlocks.map((b) => (
              <article
                key={b.title}
                className="border border-white/[0.07] bg-white/[0.02] rounded-[3px] p-6"
              >
                <h3 className="text-lg font-semibold mb-3 text-[#F59E0B]">{b.title}</h3>
                <p className="text-[#7A8494] text-sm leading-relaxed">{b.text}</p>
              </article>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby={`faq-${props.category}`} className="py-10 px-5 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Частые вопросы</h2>
          <div className="space-y-4">
            {props.faq.map((f) => (
              <details
                key={f.q}
                className="border border-white/[0.08] rounded-[3px] bg-white/[0.02] p-5"
              >
                <summary className="text-[#EDE8E0] font-semibold cursor-pointer">{f.q}</summary>
                <p className="text-[#7A8494] text-sm mt-3 leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Доставка по городам (гео-контент) */}
        <section aria-labelledby={`delivery-${props.category}`} className="py-10 px-5 max-w-6xl mx-auto">
          <h2 id={`delivery-${props.category}`} className="text-2xl font-bold mb-6">
            Доставка по всей Беларуси
          </h2>
          <p className="text-[#8B94A3] text-sm leading-relaxed max-w-3xl">
            Отправляем Белпочтой и Европочтой наложенным платежом — платите при получении,
            осмотрев изделие. В Минск посылка доезжает за 1–2 дня, в Гомель, Брест,
            Витебск, Гродно, Могилёв и Мозырь — 2–3 дня. Самовывоз из мастерской
            в Крупках — по договорённости, при заказе укажите «самовывоз».
          </p>
        </section>

        {/* Полезные статьи (перелинковка на блог) */}
        <section aria-labelledby={`articles-${props.category}`} className="py-10 px-5 max-w-6xl mx-auto">
          <h2 id={`articles-${props.category}`} className="text-2xl font-bold mb-6">Полезные статьи</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/blog/kak-otpravit-instrument-belpochtoy"
              className="block border border-white/[0.07] bg-white/[0.02] rounded-[3px] p-5 hover:border-[#D97706]/40 transition-colors"
            >
              <h3 className="text-[#F59E0B] font-semibold mb-2">Как получить посылку почтой</h3>
              <p className="text-[#7A8494] text-sm">Упаковка, отправка и возврат наложенным платежом — тот же механизм, что и для наших изделий.</p>
            </Link>
            <Link
              href="/blog/ugol-zatochki-nozha"
              className="block border border-white/[0.07] bg-white/[0.02] rounded-[3px] p-5 hover:border-[#D97706]/40 transition-colors"
            >
              <h3 className="text-[#F59E0B] font-semibold mb-2">Под каким углом точить нож</h3>
              <p className="text-[#7A8494] text-sm">Кухонный, охотничий, складной нож: таблица углов — и почему правильная доска продлевает остроту.</p>
            </Link>
          </div>
        </section>

        {/* Гарантия */}
        <section aria-labelledby={`guarantee-${props.category}`} className="py-10 px-5 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Гарантия</h2>
          <p className="text-[#8B94A3] leading-relaxed max-w-3xl">
            Каждое изделие мастер проверяет лично перед отправкой. Если при получении
            обнаружится производственный дефект (трещина, недошлифовка, отслоение) —
            сделаем замену или переделку. Если посылка пришла повреждённой при доставке —
            свяжитесь с нами, разберёмся. <strong className="text-[#C8C2BA]">
              Оплата наложенным платежом</strong> — вы осматриваете изделие в отделении
            почты перед оплатой.
          </p>
        </section>

        {/* Перелинковка */}
        <section aria-labelledby={`also-${props.category}`} className="py-10 px-5 max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Также делаем</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {otherPages.map((p) => (
              <Link
                key={p.slug}
                href={`/doski/${p.slug}/`}
                className="block border border-white/[0.07] bg-white/[0.02] rounded-[3px] p-5 hover:border-[#D97706]/40 transition-colors"
              >
                <h3 className="text-lg font-semibold text-[#F59E0B] mb-2">{p.title}</h3>
                <p className="text-[#7A8494] text-sm">{p.desc}</p>
              </Link>
            ))}
          </div>
        </section>

        <BoardOrderForm />
      </main>

      <Footer />
      <MobileCTA />
    </div>
  );
}
