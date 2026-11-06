import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { pageAlternates } from "@/lib/seo";

const SITE_URL = "https://krupki-master.by";

const POSTS = [
  {
    slug: "chto-podarit-na-novyi-god",
    title: "Что подарить на Новый год: 5 идей с дубовой доской и менажницей | Крупки Мастер",
    excerpt:
      "Практичные подарки ручной работы: доски 35–75 р., менажницы 80–130 р. Кому какой вариант и как успеть к празднику.",
  },
  {
    slug: "uspet-zakazat-podarok-na-novyi-god",
    title: "Успеть к Новому году: когда заказывать доску и менажницу | Крупки Мастер",
    excerpt:
      "3–7 дней изготовления плюс 1–3 дня почты: до какой даты заказывать подарок к празднику и как работает осмотр наложенного платежа.",
  },
  {
    slug: "doska-dlya-podachi",
    title: "Доска для подачи: 5 расстановок (сырная, стейк, закуски) | Крупки Мастер",
    excerpt:
      "Сырная плато, стейк, закуски к вину, завтрак и праздничный стол — как собрать красивую подачу на деревянной доске.",
  },
  {
    slug: "kak-delayut-dosku-pod-zakaz",
    title: "Как делают доску под заказ: этапы от лога до готовой доски | Крупки Мастер",
    excerpt:
      "Отбор дуба, раскрой на ламели, склеивание и пресс, шлифовка, масло и воск, упаковка — и почему «сделать самому» дольше и дороже.",
  },
  {
    slug: "kak-vybrat-razdelochnuyu-dosku",
    title: "Разделочная доска: дуб против бамбука, пластика и стали | Крупки Мастер",
    excerpt:
      "Честное сравнение материалов: какая доска лучше для мяса, бережнее для ножей и какая безопаснее для здоровья.",
  },
  {
    slug: "menazhnitsa-podarok",
    title: "Менажница как подарок: 7 сценариев на новоселье, свадьбу и праздник | Крупки Мастер",
    excerpt:
      "7 сценариев: новоселье, свадьба, юбилей, 8 марта и Новый год — как выбрать деревянную менажницу и что приложить к подарку.",
  },
  {
    slug: "tortsevaya-razdelochnaya-doska",
    title: "Торцевая разделочная доска: что это, чем отличается и почему дороже | Крупки Мастер",
    excerpt:
      "Что такое end grain, почему следы от ножа затягиваются и в чём разница в цене — разбираем конструкцию торцевой доски.",
  },
  {
    slug: "uhod-za-doskoy-iz-duba",
    title: "Чем пропитать доску из дуба: масло, воск и запреты | Крупки Мастер",
    excerpt:
      "Как обработать новую доску, чем покрыть, как часто обновлять пропитку и почему нельзя мыть доску в посудомойке.",
  },
  {
    slug: "chto-takoe-menazhnitsa",
    title: "Менажница из дуба: доска для подачи сыра и закусок | Крупки Мастер",
    excerpt:
      "Менажница — доска для подачи блюд: сыра, мяса, закусок. Чем отличается от разделочной доски, как выбрать и использовать.",
  },
  {
    slug: "zatochka-cepi-benzopily",
    title: "Заточка цепи бензопилы: цена, признаки затупления | Крупки Мастер",
    excerpt:
      "Как понять, что цепь затупилась, почему нельзя точить болгаркой и сколько стоит профессиональная заточка в Беларуси.",
  },
  {
    slug: "ugol-zatochki-nozha",
    title: "Угол заточки ножа: что меняет ошибка в пять градусов | Крупки Мастер",
    excerpt:
      "Почему универсального угла нет, что будет при ошибке в 5 градусов и как мастерская выдерживает угол по всей длине клинка.",
  },
  {
    slug: "ruchnaya-ili-mashinnaya-zatochka",
    title: "Ручная или машинная заточка ножей: что выбрать в 2026 | Крупки Мастер",
    excerpt:
      "Честное сравнение: почему машинная заточка за 3 BYN быстро тупится и когда она действительно достаточна.",
  },
  {
    slug: "kak-otpravit-instrument-belpochtoy",
    title: "Как отправить нож на заточку Белпочтой: инструкция | Крупки Мастер",
    excerpt:
      "Упаковка, выбор отделения, стоимость пересылки и наложенный платёж — весь путь вашей посылки от двери до заточной.",
  },
  {
    slug: "skolko-stoit-zatochka",
    title: "Сколько стоит заточка ножей в Беларуси: цены 2026 | Крупки Мастер",
    excerpt:
      "Обзор цен по стране: от сетевых точек в Минске до частных мастеров, и за что вы реально платите.",
  },
];

/**
 * Категоризация блога по направлениям (SDD 2.5, T-31).
 * URL статей не меняются — размечаем только принадлежность к направлению,
 * чтобы «уход за доской» и «угол заточки» не сваливались в одну кучу.
 */
const WOOD_SLUGS = new Set([
  "chto-podarit-na-novyi-god",
  "uspet-zakazat-podarok-na-novyi-god",
  "doska-dlya-podachi",
  "kak-delayut-dosku-pod-zakaz",
  "kak-vybrat-razdelochnuyu-dosku",
  "menazhnitsa-podarok",
  "tortsevaya-razdelochnaya-doska",
  "uhod-za-doskoy-iz-duba",
  "chto-takoe-menazhnitsa",
]);

const CATEGORIES = [
  {
    id: "wood",
    title: "Дерево и посуда",
    note: "Доски, менажницы, уход и выбор изделий из дуба.",
    slugs: WOOD_SLUGS,
    href: "/doski/",
    hrefLabel: "Изделия из дерева",
  },
  {
    id: "sharpening",
    title: "Заточка",
    note: "Углы, цепи бензопил, цены и отправка инструмента почтой.",
    slugs: new Set(
      POSTS.map((p) => p.slug).filter((s) => !WOOD_SLUGS.has(s))
    ),
    href: "/zatochka/",
    hrefLabel: "Мастерская: заточка",
  },
];

export const metadata: Metadata = {
  title: "Блог о заточке и деревянных изделиях | Крупки Мастер",
  description:
    "Статьи о заточке цепей бензопил и ножей, углах заточки, ценах в Беларуси — и о деревянных изделиях: что такое менажница, какую доску выбрать.",
  alternates: pageAlternates("/blog/"),
  openGraph: {
    title: "Блог о заточке и деревянных изделиях | Крупки Мастер",
    description:
      "Статьи о заточке цепей и ножей — и о деревянных изделиях: что такое менажница, какую разделочную доску выбрать.",
    url: "https://krupki-master.by/blog",
    siteName: "Krupki Master",
    locale: "ru_BY",
    type: "website",
    images: [
      {
        url: "https://krupki-master.by/og-doski.jpg",
        width: 1200,
        height: 630,
        alt: "Доска и менажница из дуба — блог Крупки Мастер",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Блог о заточке и деревянных изделиях | Крупки Мастер",
    description: "Статьи про заточку, доски и менажницы из дуба.",
    images: ["https://krupki-master.by/og-doski.jpg"],
  },
};

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-[#0C0C0E] text-[#EDE8E0] antialiased">
      <Header />
      <main className="pt-28 pb-24 max-w-3xl mx-auto px-5">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
          Блог о заточке и изделиях из дерева
        </h1>
        <p className="text-[#6E7886] leading-relaxed mb-12">
          Практические статьи от мастерской Крупки Мастер: как понять, что инструмент
          затупился, чем ручная заточка отличается от машинной, как отправить нам
          инструмент из любого города Беларуси — и что такое менажница, какую
          разделочную доску выбрать.
        </p>

        {CATEGORIES.map((cat) => {
          const posts = POSTS.filter((p) => cat.slugs.has(p.slug));
          if (posts.length === 0) return null;
          return (
            <section key={cat.id} aria-labelledby={`cat-${cat.id}`} className="mb-14">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-5">
                <h2
                  id={`cat-${cat.id}`}
                  className="font-mono text-[11px] font-bold tracking-[0.2em] uppercase text-[#D97706]"
                >
                  {cat.title} · {posts.length}
                </h2>
                <Link
                  href={cat.href}
                  className="text-[#8B94A3] text-sm hover:text-[#D97706] transition-colors"
                >
                  {cat.hrefLabel} →
                </Link>
              </div>
              <p className="text-[#555560] text-sm mb-5">{cat.note}</p>
              <ul className="space-y-4">
                {posts.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}/`}
                      className="block border border-white/[0.07] bg-white/[0.02] rounded-[3px] p-6 hover:border-[#D97706]/40 transition-colors"
                    >
                      <h3 className="text-lg font-semibold text-[#EDE8E0] mb-2">{p.title}</h3>
                      <p className="text-[#6E7886] text-sm leading-relaxed">{p.excerpt}</p>
                      <span className="inline-block mt-3 text-[#D97706] text-sm">Читать →</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}

        <div className="border border-white/[0.07] bg-white/[0.02] rounded-[3px] p-6">
          <p className="text-[#EDE8E0] font-semibold text-sm mb-2">
            Что нужно по дому?
          </p>
          <p className="text-[#7A8494] text-sm leading-relaxed mb-4">
            Электрика, декоративная штукатурка и отделочные работы — с выездом
            на объект в Крупках, Борисове, Толочине и Новолукомле.
          </p>
          <Link
            href="/uslugi/"
            className="inline-flex items-center gap-2 text-[#D97706] text-sm hover:text-[#F59E0B] transition-colors"
          >
            Бытовые услуги →
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
