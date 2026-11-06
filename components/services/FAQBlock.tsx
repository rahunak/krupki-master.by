import type { FaqItem } from "@/data/services";

/**
 * FAQBlock — «вопрос-ответ» + JSON-LD FAQPage (SDD 3.3, 5).
 *
 * Правило: вопросы и ответы разметки совпадают с видимым текстом страницы.
 * Иначе разметка превращается в спам и снимается поисковиком.
 */
export default function FAQBlock({
  items,
  title = "Частые вопросы",
  pageUrl,
}: {
  items: FaqItem[];
  title?: string;
  /** Канонический URL страницы — для mainEntityOfPage */
  pageUrl?: string;
}) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(pageUrl ? { mainEntityOfPage: pageUrl } : {}),
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section aria-labelledby="faq-heading" className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <h2 id="faq-heading" className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
        {title}
      </h2>
      <div className="space-y-3">
        {items.map((f) => (
          <details
            key={f.q}
            className="group border border-white/[0.08] rounded-[3px] bg-white/[0.02] p-5"
          >
            <summary className="cursor-pointer text-base font-semibold text-[#EDE8E0] marker:content-none flex justify-between items-center gap-4">
              {f.q}
              <span className="text-[#F59E0B] group-open:rotate-45 transition-transform text-2xl leading-none shrink-0">
                +
              </span>
            </summary>
            <p className="mt-3 text-[#7A8494] text-sm leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
