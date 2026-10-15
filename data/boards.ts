/**
 * Данные по изделиям из дерева (SSOT).
 * Используется: /doski/, /doski/razdelochnye/, /doski/menazhnitsy/, /doski/podarochnye_nabory/.
 * Фото: реальные фото изделий в /public/images/*.avif (пути ведут из корня /public).
 */

export const BOARDS_SECTION = {
  title: "Изделия из дерева ручной работы",
  description:
    "Разделочные доски, менажницы и подарочные наборы из массива дуба. Изготовление под заказ в Крупках, доставка по всей Беларуси.",
};

export interface BoardProduct {
  slug: string;
  name: string;
  size: string;
  priceFrom: number;
  priceTo: number;
  includes?: string;
  /** Ракурсы изделия для свайп-галереи (пути в /public/images/, с расширением) */
  photos?: string[];
  labels?: string[];
}

/**
 * Реальные фото: пути от /public/images/ (без префикса «/» — Next Image подключает как /<path>).
 * 3 ракурса на SKU: целиком / под углом / деталь (метки из ANGLE_LABELS в ProductPhotoGallery).
 */
const PHOTOS = (...files: string[]): string[] => files;
const LABELS = (...files: string[]): string[] => files;

/** Фото категорий для hero-блоков страниц (/doski/<category>/) */
export const HERO_PHOTOS = {
  razdelochnye: "images/big_board_1.avif",
  menazhnitsy: "images/menazhnitsa_circle.avif",
  podarochnye_nabory: "images/all_with_food.png",
} as const;

/** Товарная линейка (цены утверждены 2026-10-10) */
export const PRODUCTS: Record<string, BoardProduct[]> = {
  razdelochnye: [
    {
      slug: "small_board",
      name: "Разделочная доска малая",
      size: "30 × 20 × 2 см, массив дуба",
      priceFrom: 35,
      priceTo: 45,
      photos: PHOTOS(
        "images/small_board_1.avif",
        "images/small_board_2.avif",
        "images/small_board_3.avif",
      ),
      labels: LABELS("Закруглены 2-а угла", "Прямоугольная форма", "Скругленные углы")
    },
    {
      slug: "big_board",
      name: "Разделочная доска большая",
      size: "40 × 30 × 3 см, массив дуба",
      priceFrom: 55,
      priceTo: 75,
      photos: PHOTOS(
        "images/big_board_1.avif",
        "images/big_board_2.avif",
        "images/big_board_3.avif",
      ),
      labels: LABELS("Прямоугольная форма", "круглая", "Обожженная")
    },
    {
      slug: "serv_board",
      name: "Сервировочная доска-слайс",
      size: "35 × 18 × 2 см, массив дуба",
      priceFrom: 45,
      priceTo: 60,
      includes: "Сок-канавка по желанию",
      photos: PHOTOS(
        "images/serv_board.avif",
        "images/serv_board_2.avif",
        "images/serv_board_3.avif",
      ),
      labels: LABELS("Прямоугольная форма", "круглая", "Тонкая прямоугольная")
    },
  ],
  menazhnitsy: [
    {
      slug: "menazhnitsa-classic",
      name: "Менажница классическая",
      size: "40 × 25 × 2 см, массив дуба",
      priceFrom: 80,
      priceTo: 100,
      photos: PHOTOS(
        "images/menazhnitsa_squaricle.avif",
        "images/menazhnitsa_circle.avif",
        "images/menazhnitsa_squaricle_3.avif",
      ),
      labels: LABELS("Прямоугольная форма", "круглая", "Тонкая прямоугольная")
    },
    {
      slug: "menazhnitsa-sauces",
      name: "Менажница с соусниками",
      size: "40 × 25 см + 2 соусника из дуба",
      priceFrom: 100,
      priceTo: 130,
      includes: "Соусники идут в комплекте",
      photos: PHOTOS(
        "images/menazhnitsa_with_sousce.avif",
        "images/menazhnitsa_with_sousce_3.avif",
        "images/menazhnitsa_with_sousce_2.avif",
      ),
      labels: LABELS("Прямоугольная форма", "круглая", "Тонкая прямоугольная")
    },
  ],
  "podarochnye_nabory": [
    {
      slug: "gift-basic",
      name: "Подарочный набор «Базовый»",
      size: "Доска 30×20 см + соусник",
      priceFrom: 120,
      priceTo: 140,
      includes: "Подарочная упаковка включена",
      photos: PHOTOS(
        "images/all_without_food.png",
        "images/all_belor_vibe.png",
        "images/all_with_food.png",
      ),
      labels: LABELS("Прямоугольная форма", "круглая", "Тонкая прямоугольная")
    },
    {
      slug: "gift-family",
      name: "Подарочный набор «Семейный»",
      size: "Доска 40×30 см + 2 соусника",
      priceFrom: 140,
      priceTo: 160,
      includes: "Подарочная упаковка + открытка",
      photos: PHOTOS(
        "images/all_with_food.png",
        "images/all_belor_vibe.png",
        "images/all_without_food.png",
      ),
      labels: LABELS("Прямоугольная форма", "круглая", "Тонкая прямоугольная")
    },
  ],
};;

export const BOARD_PAGES = [
  { slug: "", title: "Изделия из дерева", desc: "Обзор: доски, менажницы, наборы" },
  {
    slug: "razdelochnye",
    title: "Разделочные доски из дуба",
    desc: "35–75 р. · изготовление 3–7 дней",
  },
  {
    slug: "menazhnitsy",
    title: "Менажницы деревянные",
    desc: "80–130 р. · дубовая массив",
  },
  {
    slug: "podarochnye_nabory",
    title: "Подарочные наборы",
    desc: "120–160 р. · доска + соусники",
  },
] as const;
