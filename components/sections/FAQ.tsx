import { SITE_URL } from "@/data/contacts";

const FAQS = [
  {
    q: "Сколько стоит заточка?",
    a: "Кухонный нож — от 4 BYN, охотничий нож — от 12 BYN, цепь бензопилы — от 9 BYN, нож мясорубки — от 9 BYN, ножницы — от 5 BYN. Точная цена зависит от состояния инструмента и называется после осмотра.",
  },
  {
    q: "Как отправить инструмент, если я в Минске, Гомеле или другом городе?",
    a: "Отправьте инструмент Белпочтой на адрес мастерской (д. Прошика, ул. Молодёжная, 1). После заточки вернём инструмент тем же способом. Работаем по всей Беларуси.",
  },
  {
    q: "Работаете ли вы по наложенному платежу?",
    a: "Да, отправка Белпочтой возможна наложенным платежом — вы платите при получении, когда уже держите заточенный инструмент в руках.",
  },
  {
    q: "Сколько занимает заточка?",
    a: "Обычно 1–2 рабочих дня с момента получения инструмента. При отправке почтой добавьте срок доставки в обе стороны.",
  },
  {
    q: "Чем ручная заточка лучше станка?",
    a: "Каждый зуб и каждое лезвие обрабатываются вручную на профессиональных системах (Profil, TSPROF): сохраняется геометрия и угол factory-заточки, металл не перегревается и не теряет твёрдость.",
  },
];

export function FAQ() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="py-10 px-5 max-w-6xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <h2 className="text-3xl font-bold mb-8">
        Частые вопросы о заточке ножей и цепей
      </h2>
      <div className="space-y-3">
        {FAQS.map((f) => (
          <details
            key={f.q}
            className="group border border-white/[0.08] rounded-lg bg-white/[0.02] p-5"
          >
            <summary className="cursor-pointer text-lg font-semibold text-[#EDE8E0] marker:content-none flex justify-between items-center">
              {f.q}
              <span className="text-[#F59E0B] group-open:rotate-45 transition-transform text-2xl leading-none">
                +
              </span>
            </summary>
            <p className="mt-3 text-[#7A8494] leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
