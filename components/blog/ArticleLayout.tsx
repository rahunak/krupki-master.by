import type { MetadataRoute } from "next";
import Link from "next/link";
import { ArrowLeft, Phone, MessageCircle } from "lucide-react";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { SITE_NAME, SITE_URL, PHONE_NUMBER } from "@/data/contacts";

/**
 * Единый шаблон статьи блога: шапка/подвал сайта + типографика длинного чтения.
 * Схема Article + BreadcrumbList добавляется из метаданных конкретной статьи.
 * CTA в конце — упрощённая форма (телефон + Viber/звонок) через ссылку на #order
 * и прямой tel/viber, чтобы читатель статьи конвертировался без прокрутки до формы.
 */

export interface ArticleMeta {
  slug: string;
  title: string; // полный title для <title>
  h1: string;
  description: string;
  publishedAt: string; // ISO
  modifiedAt?: string; // ISO
}

interface ArticleLayoutProps {
  meta: ArticleMeta;
  children: React.ReactNode;
}

/** Типографика статьи: консистентные стили для h2/h3/p/ul по всему блогу */
export function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="space-y-5 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#EDE8E0] [&_h2]:mt-12 [&_h2]:mb-4 [&_h2]:tracking-tight [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-[#EDE8E0] [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:text-[#8B94A3] [&_p]:leading-relaxed [&_ul]:space-y-2 [&_ul]:list-none [&_li]:text-[#8B94A3] [&_li]:leading-relaxed [&_li]:pl-5 [&_li]:relative [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.6em] [&_li]:before:w-1 [&_li]:before:h-1 [&_li]:before:rounded-full [&_li]:before:bg-[#D97706] [&_strong]:text-[#C8C2BA] [&_table]:w-full [&_table]:text-sm [&_th]:text-left [&_th]:py-2 [&_th]:px-3 [&_th]:text-[#EDE8E0] [&_th]:border-b [&_th]:border-white/10 [&_td]:py-2 [&_td]:px-3 [&_td]:text-[#8B94A3] [&_td]:border-b [&_td]:border-white/5">
      {children}
    </div>
  );
}

/** CTA-блок в конце статьи: конверсия в заявку */
export function ArticleCTA({ text }: { text: string }) {
  return (
    <div className="mt-14 border border-[#D97706]/25 bg-[#D97706]/[0.06] rounded-[3px] p-7">
      <p className="text-[#EDE8E0] font-semibold text-lg mb-2">Нужна профессиональная заточка?</p>
      <p className="text-[#8B94A3] text-sm leading-relaxed mb-5">{text}</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/#order"
          className="inline-flex items-center justify-center gap-2 bg-[#D97706] text-[#0A0A0B] font-bold text-sm px-6 py-3.5 rounded-[2px] hover:bg-[#F59E0B] transition-colors"
        >
          <MessageCircle size={16} aria-hidden="true" />
          Оставить телефон — напишем в Viber
        </Link>
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="inline-flex items-center justify-center gap-2 border border-white/[0.12] text-[#C8C2BA] font-medium text-sm px-6 py-3.5 rounded-[2px] hover:border-white/25 hover:text-[#EDE8E0] transition-colors"
        >
          <Phone size={16} aria-hidden="true" />
          {PHONE_NUMBER}
        </a>
      </div>
    </div>
  );
}

export default function ArticleLayout({ meta, children }: ArticleLayoutProps) {
  const url = `${SITE_URL}/blog/${meta.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${url}#article`,
        headline: meta.h1,
        description: meta.description,
        datePublished: meta.publishedAt,
        dateModified: meta.modifiedAt ?? meta.publishedAt,
        author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        mainEntityOfPage: url,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Главная", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Блог", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: meta.h1, item: url },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#0C0C0E] text-[#EDE8E0] antialiased overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <main className="pt-28 pb-24">
        <article className="max-w-3xl mx-auto px-5">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#555560] text-sm hover:text-[#D97706] transition-colors mb-10"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Все статьи
          </Link>

          <h1 className="text-3xl md:text-4xl font-extrabold text-[#EDE8E0] leading-[1.15] tracking-tight mb-5">
            {meta.h1}
          </h1>
          <p className="text-[#555560] text-xs mb-12">
            <time dateTime={meta.publishedAt}>
              {new Date(meta.publishedAt).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })}
            </time>{" "}
            · {SITE_NAME}
          </p>

          <Prose>{children}</Prose>

          <ArticleCTA text="Работаем по всей Беларуси: отправьте инструмент Белпочтой или Европочтой — заточим за 1–3 дня и вернём наложенным платежом." />
        </article>
      </main>

      <Footer />
    </div>
  );
}
