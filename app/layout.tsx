import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL, SITE_NAME, PHONE_NUMBER, POSTAL_CODE } from "@/data/contacts";
import YandexMetrika from "@/components/YandexMetrika";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import PhoneClickTracker from "@/components/PhoneClickTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"], display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin", "cyrillic"], display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0C0C0E",
  width: "device-width",
  initialScale: 1,
  // maximumScale не ограничиваем: запрет зума ломает доступность для тех,
  // кому нужно увеличить текст (влияет и на мобильный опыт в Google).
  // От автозума iOS спасает font-size: 16px у полей формы.
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Главная тема сайта — услуги, которые можно заказать (SDD 3.2). Заточка
  // и деревянная посуда остаются отдельными разделами (/zatochka/, /doski/).
  title: "Бытовые услуги в Крупках — электрика, штукатурка, отделка | krupki-master.by",
  description:
    "Заказать бытовые услуги в Крупках и 50 км: электрика, декоративная штукатурка, отделочные работы. Выезд на объект, цену называем после замера.",
  keywords: [
    "заказать услуги Крупки",
    "бытовые услуги Крупки",
    "электрик Крупки",
    "декоративная штукатурка Крупки",
    "отделочные работы Крупки",
    "ремонт по этапам Крупки",
    "электрик Борисов",
    "мастер Борисов Толочин Новолукомль",
    "заточка ножей Крупки",
    "заточка цепей бензопил",
    "деревянная посуда на заказ",
    "Крупки Мастер",
    "krupki-master.by",
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  formatDetection: {
    telephone: true,
    email: false,
    address: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: SITE_NAME,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Бытовые услуги в Крупках — электрика, штукатурка, отделка",
    description:
      "Заказать электрику, декоративную штукатурку и отделочные работы. Выезд: Крупки, Борисов, Толочин, Новолукомль. Цену называем после замера.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ru_BY",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og_image.png`,
        width: 1200,
        height: 630,
        alt: "Крупки Мастер — бытовые услуги с выездом на объект",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Бытовые услуги в Крупках — электрика, штукатурка, отделка",
    description: "Электрика, штукатурка, отделочные работы — заказать услуги мастера. Крупки и 50 км.",
    images: [`${SITE_URL}/og_image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "RCRvXuRfJm0JBiUWpkYODdoW4agcylIlSBObFNPp21w",
    yandex: "6c961a7ea994387b",
  },
  category: "services",
};

// JSON-LD для локального SEO и E-E-A-T
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.svg`,
      image: `${SITE_URL}/og_image.png`,
      telephone: PHONE_NUMBER,
      // priceRange намеренно не указан: «от 4 BYN» — цена заточки ножа,
      // а главная продаёт выездные услуги, где цена называется после замера.
      // Низкая цифра в сниппете приводит не тех клиентов. Указать диапазон
      // можно, когда владелец согласует прайс на услуги (T-10).
      address: {
        "@type": "PostalAddress",
        streetAddress: "д.Прошика ул.Молодежная д.1",
        addressLocality: "Крупки",
        addressRegion: "Минская область",
        postalCode: POSTAL_CODE,
        addressCountry: "BY",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 54.4843,
        longitude: 29.1503
      },
      // SDD 3.3 / T-28: реальная зона выезда — Крупки + 50 км.
      // Доставка заточки по Беларуси описывается отдельной услугой
      // (areaServed у Service на /zatochka/*), а не зоной выезда мастера.
      areaServed: [
        { "@type": "City", name: "Крупки" },
        { "@type": "City", name: "Борисов" },
        { "@type": "City", name: "Толочин" },
        { "@type": "City", name: "Новолукомль" },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "09:00",
          closes: "18:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "10:00",
          closes: "15:00",
        },
      ],
      // SDD 3.3: каталог больше не «Услуги ручной заточки» — заточка стала
      // одним из двух направлений. Цены услуг ремонта/электрики/штукатурки
      // не выводятся, пока прайс не согласован владельцем (T-10).
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Бытовые услуги и мастерская",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Электрические работы",
              description: "Розетки, освещение, щиты, поиск неисправностей проводки с выездом на объект.",
              url: `${SITE_URL}/uslugi/elektrik/`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Сантехнические работы",
              description: "Смесители, унитазы, подключение техники, разводка труб и поиск протечек с выездом на объект.",
              url: `${SITE_URL}/uslugi/santehnik/`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Декоративная штукатурка",
              description: "Подготовка основания и нанесение декоративных покрытий.",
              url: `${SITE_URL}/uslugi/shtukaturka/`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Отделочные работы",
              description: "Демонтаж, черновая и чистовая отделка по этапам.",
              url: `${SITE_URL}/uslugi/remont/`,
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Ручная заточка ножей",
              description: "Ручная заточка ножей с сохранением геометрии и угла.",
              url: `${SITE_URL}/zatochka/nozhi/`,
            },
            price: "4",
            priceCurrency: "BYN",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Заточка цепей для бензопил",
              description: "Точная заточка режущих зубьев и ограничителей цепи бензопилы.",
              url: `${SITE_URL}/zatochka/cepi-benzopil/`,
            },
            price: "9",
            priceCurrency: "BYN",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Заточка столярного и садового инструмента",
              description: "Заточка топоров, секаторов, стамесок, ножей рубанка и мясорубки.",
              url: `${SITE_URL}/zatochka/instrument/`,
            },
            price: "5",
            priceCurrency: "BYN",
          },
        ],
      },
    },
  ],
};



export default function RootLayout({ children }: LayoutProps<"/">) {

  const isProduction = process.env.NODE_ENV === 'production';

  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{ scrollBehavior: "smooth" }}
    >
      <head>
        {/* canonical и hreflang НЕ выводятся здесь (SDD 3.1, T-01).
            Раньше здесь стоял жёсткий <link rel="canonical" href={SITE_URL}>,
            из-за которого на каждой странице было два canonical: этот, всегда
            на главную, и корректный из alternates.canonical страницы.
            Единственный источник теперь — pageAlternates() в lib/seo.ts. */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        {children}

        {/* Яндекс.Метрика — поведенческие факторы Яндекса (часть формулы ранжирования).
            Загрузка отложенная (после первого взаимодействия / 3.5 с) — не бьёт по TBT.
            Номер счётчика вписывается в components/YandexMetrika.tsx. */}
        {isProduction && <YandexMetrika enabled={isProduction} />}

        {/* GA4 — прямое подключение через gtag.js (без GTM).
            ID вписать в components/GoogleAnalytics.tsx. */}
        {isProduction && <GoogleAnalytics enabled={isProduction} />}

        {/* Глобальный трекер кликов по телефонным ссылкам → GA4 tel_click */}
        {isProduction && <PhoneClickTracker />}

        {isProduction && (
          <>
            <Analytics />
            <SpeedInsights />
          </>
        )}

      </body>
    </html>
  );
}