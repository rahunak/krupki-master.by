/**
 * Средние цены по рынку Беларуси — только для страницы /ceny/.
 *
 * Это НЕ прайс мастера и не публичная оферта: цифры собраны из открытых
 * прайс-листов электриков, штукатуров, плиточников и ремонтных бригад
 * (Минск и Минская область, ноябрь 2026), усреднены и округлены.
 *
 * В Крупках и районе цены обычно ниже минских на 10–20%, поэтому на странице
 * прямо написано, что это ориентир, а точная стоимость — после замера.
 * Когда владелец утвердит собственный прайс, этот файл заменяется на него.
 */

export interface MarketPriceItem {
  name: string;
  /** Единица измерения: «за точку», «за м²», «за выезд» */
  unit: string;
  /** Средняя цена «от» в BYN. 0 — бесплатно */
  averageFrom: number;
  /** Разброс цен в открытых прайсах */
  range: string;
}

export interface MarketPriceGroup {
  slug: string;
  title: string;
  /** Ссылка на страницу услуги, если она существует */
  path?: string;
  items: MarketPriceItem[];
}

export const MARKET_PRICE_NOTE =
  "Средние цены по открытым прайсам мастеров и бригад Беларуси (ноябрь 2026), округлены. Это ориентир, а не оферта: в Минске цены выше, в Крупках и районе — ниже. Точную стоимость мастер называет после замера.";

export const MARKET_PRICE_GROUPS: MarketPriceGroup[] = [
  {
    slug: "elektrik",
    title: "Электрика",
    path: "/uslugi/elektrik/",
    items: [
      {
        name: "Замена розетки или выключателя",
        unit: "за точку",
        averageFrom: 8,
        range: "5–12 BYN",
      },
      {
        name: "Монтаж светильника",
        unit: "за точку",
        averageFrom: 20,
        range: "10–37 BYN",
      },
      {
        name: "Поиск и устранение неисправности",
        unit: "за выезд",
        averageFrom: 30,
        range: "25–50 BYN",
      },
      {
        name: "Сборка и подключение щита",
        unit: "за щит",
        averageFrom: 50,
        range: "20–100 BYN",
      },
      {
        name: "Прокладка новой линии",
        unit: "за метр",
        averageFrom: 3,
        range: "2–5 BYN/м",
      },
    ],
  },
  {
    slug: "shtukaturka",
    title: "Декоративная штукатурка",
    path: "/uslugi/shtukaturka/",
    items: [
      {
        name: "Подготовка основания под покрытие",
        unit: "за м²",
        averageFrom: 15,
        range: "10–25 BYN/м²",
      },
      {
        name: "Нанесение декоративного покрытия",
        unit: "за м²",
        averageFrom: 28,
        range: "22–42 BYN/м²",
      },
      {
        name: "Оформление откосов",
        unit: "за метр",
        averageFrom: 15,
        range: "13–27 BYN/м.п.",
      },
      {
        name: "Выезд на замер",
        unit: "за выезд",
        averageFrom: 0,
        range: "бесплатно",
      },
    ],
  },
  {
    slug: "remont",
    title: "Отделочные работы",
    path: "/uslugi/remont/",
    items: [
      {
        name: "Демонтаж покрытий",
        unit: "за м²",
        averageFrom: 8,
        range: "3–14 BYN/м²",
      },
      {
        name: "Штукатурка стен",
        unit: "за м²",
        averageFrom: 15,
        range: "7–22 BYN/м²",
      },
      {
        name: "Шпаклёвка под покраску",
        unit: "за м²",
        averageFrom: 14,
        range: "8–24 BYN/м²",
      },
      {
        name: "Плиточные работы",
        unit: "за м²",
        averageFrom: 28,
        range: "18–38 BYN/м²",
      },
      {
        name: "Малярные работы",
        unit: "за м²",
        averageFrom: 8,
        range: "4–9 BYN/м²",
      },
    ],
  },
  {
    slug: "santehnik",
    title: "Сантехника",
    path: "/uslugi/santehnik/",
    items: [
      {
        name: "Установка или замена смесителя",
        unit: "за шт.",
        averageFrom: 30,
        range: "25–40 BYN",
      },
      {
        name: "Подключение стиральной машины",
        unit: "за шт.",
        averageFrom: 40,
        range: "19–70 BYN",
      },
      {
        name: "Установка унитаза",
        unit: "за шт.",
        averageFrom: 70,
        range: "60–100 BYN",
      },
      {
        name: "Устранение засора",
        unit: "за выезд",
        averageFrom: 35,
        range: "19–60 BYN",
      },
    ],
  },
  {
    slug: "demontazh",
    title: "Демонтаж",
    items: [
      {
        name: "Демонтаж перегородок",
        unit: "за м²",
        averageFrom: 15,
        range: "8–25 BYN/м²",
      },
      {
        name: "Демонтаж плитки",
        unit: "за м²",
        averageFrom: 11,
        range: "9–13 BYN/м²",
      },
    ],
  },
];
