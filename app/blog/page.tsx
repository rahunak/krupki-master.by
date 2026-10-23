import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const POSTS = [
  {
    slug: "kak-vybrat-razdelochnuyu-dosku",
    title: "Как выбрать разделочную доску: дуб, бамбук, пластик, сталь",
    excerpt:
      "Честное сравнение материалов: какая доска лучше для мяса, бережнее для ножей и какая безопаснее для здоровья.",
  },
  {
    slug: "menazhnitsa-podarok",
    title: "Менажница как подарок: кому дарить и как выбрать",
    excerpt:
      "7 сценариев: новоселье, свадьба, юбилей, 8 марта и Новый год — как выбрать деревянную менажницу и что написать при гравировке.",
  },
  {
    slug: "tortsevaya-razdelochnaya-doska",
    title: "Торцевая разделочная доска: чем отличается от обычной и почему дороже",
    excerpt:
      "Что такое end grain, почему следы от ножа затягиваются и в чём разница в цене — разбираем конструкцию торцевой доски.",
  },
  {
    slug: "uhod-za-doskoy-iz-duba",
    title: "Как ухаживать за доской из дуба: масло, воск и что запрещено",
    excerpt:
      "Как обработать новую доску, чем покрыть, как часто обновлять пропитку и почему нельзя мыть доску в посудомойке.",
  },
  {
    slug: "chto-takoe-menazhnitsa",
    title: "Что такое менажница и для чего она нужна",
    excerpt:
      "Менажница — доска для подачи блюд: сыра, мяса, закусок. Чем отличается от разделочной доски, как выбрать и использовать.",
  },
  {
    slug: "zatochka-cepi-benzopily",
    title: "Заточка цепи бензопилы: цена, признаки и когда пора к мастеру",
    excerpt:
      "Как понять, что цепь затупилась, почему нельзя точить болгаркой и сколько стоит профессиональная заточка в Беларуси.",
  },
  {
    slug: "ugol-zatochki-nozha",
    title: "Угол заточки ножа: таблица углов для кухонных, охотничьих и складных ножей",
    excerpt:
      "Почему универсального угла нет, что будет при ошибке в 5 градусов и как мастерская выдерживает угол по всей длине клинка.",
  },
  {
    slug: "ruchnaya-ili-mashinnaya-zatochka",
    title: "Ручная или машинная заточка ножей: чем отличаются и что выбрать",
    excerpt:
      "Честное сравнение: почему машинная заточка за 3 BYN быстро тупится и когда она действительно достаточна.",
  },
  {
    slug: "kak-otpravit-instrument-belpochtoy",
    title: "Как отправить нож или цепь на заточку Белпочтой: пошаговая инструкция",
    excerpt:
      "Упаковка, выбор отделения, стоимость пересылки и наложенный платёж — весь путь вашей посылки от двери до заточной.",
  },
  {
    slug: "skolko-stoit-zatochka",
    title: "Сколько стоит заточка ножей и инструмента в Беларуси: цены 2026",
    excerpt:
      "Обзор цен по стране: от сетевых точек в Минске до частных мастеров, и за что вы реально платите.",
  },
];

export const metadata: Metadata = {
  title: "Блог о заточке и деревянных изделиях | Крупки Мастер",
  description:
    "Статьи о заточке цепей бензопил и ножей, углах заточки, ценах в Беларуси — и о деревянных изделиях: что такое менажница, какую доску выбрать.",
  alternates: { canonical: "https://krupki-master.by/blog" },
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

        <ul className="space-y-4">
          {POSTS.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="block border border-white/[0.07] bg-white/[0.02] rounded-[3px] p-6 hover:border-[#D97706]/40 transition-colors"
              >
                <h2 className="text-lg font-semibold text-[#EDE8E0] mb-2">{p.title}</h2>
                <p className="text-[#6E7886] text-sm leading-relaxed">{p.excerpt}</p>
                <span className="inline-block mt-3 text-[#D97706] text-sm">Читать →</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
