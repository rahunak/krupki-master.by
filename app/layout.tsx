import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://krupki-master.by";
const SITE_NAME = "Крупки Мастер";
const PHONE_NUMBER = "+375333123386";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Ручная заточка ножей, цепей и инструмента | krupki-master.by",
  description:
    "Профессиональная ручная заточка кухонных и охотничьих ножей, цепей бензопил, столярного и садового инструмента. Точные цены. Доставка по всей Беларуси (Минск, Гомель, Брест и др.) Белпочтой. Оплата наложенным платежом.",
  keywords: [
    "ручная заточка ножей",
    "заточка цепей бензопил",
    "заточка садового инструмента",
    "заточка столярного инструмента",
    "заточка топоров и секаторов",
    "заточка ножей мясорубки",
    "заточка ножей Минск",
    "заточка инструмента Гомель",
    "заточка цепей Брест",
    "заточка ножей с доставкой по Беларуси",
    "цена заточки ножей",
    "Крупки Мастер",
    "krupki-master.by",
    "стоимость заточки цепей",
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
    title: "Ручная заточка ножей и цепей | Доставка по Беларуси | krupki-master.by",
    description:
      "Профессиональная заточка кухонных, охотничьих ножей, цепей бензопил и столярного инструмента. Доставка Белпочтой по всей РБ.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "ru_BY",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Ручная заточка ножей и инструмента Крупки Мастер",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ручная заточка ножей и цепей | Доставка по Беларуси",
    description: "Профессиональная заточка ножей, цепей и инструмента. Доставка по РБ.",
    images: [`${SITE_URL}/og-image.jpg`],
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
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
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
      image: `${SITE_URL}/og-image.jpg`,
      telephone: PHONE_NUMBER,
      priceRange: "5-20 BYN",
      address: {
        "@type": "PostalAddress",
        streetAddress: "ул. Ленина, 1", // Заменить на реальный адрес в Крупках
        addressLocality: "Крупки",
        addressRegion: "Минская область",
        postalCode: "222120",
        addressCountry: "BY",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 54.3167,
        longitude: 29.1333,
      },
      // Покрытие всей РБ благодаря доставке
      areaServed: [
        { "@type": "Country", name: "Беларусь" },
        { "@type": "City", name: "Минск" },
        { "@type": "City", name: "Гомель" },
        { "@type": "City", name: "Брест" },
        { "@type": "City", name: "Гродно" },
        { "@type": "City", name: "Витебск" },
        { "@type": "City", name: "Могилев" },
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
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Услуги ручной заточки",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Ручная заточка кухонных и охотничьих ножей",
              description: "Профессиональная ручная заточка ножей с сохранением геометрии и угла.",
            },
            price: "10",
            priceCurrency: "BYN",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Заточка цепей для бензопил",
              description: "Точная заточка режущих зубьев и ограничителей цепи бензопилы.",
            },
            price: "9",
            priceCurrency: "BYN",
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Заточка садового и столярного инструмента",
              description: "Заточка топоров, секаторов, стамесок, ножей рубанка и мясорубки.",
            },
            price: "9",
            priceCurrency: "BYN",
          },
        ],
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{ scrollBehavior: "smooth" }}
    >
      <head>
        <link rel="canonical" href={SITE_URL} />
        <link rel="alternate" hrefLang="ru" href={SITE_URL} />
        <link rel="alternate" hrefLang="ru-BY" href={SITE_URL} />
        <link rel="alternate" hrefLang="x-default" href={SITE_URL} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "LocalBusiness",
                  "@id": "https://krupki-master.by/#business",
                  name: "Krupki Master",
                  image: "https://krupki-master.by/og-image.jpg",
                  url: "https://krupki-master.by",
                  telephone: "+375333123386",
                  priceRange: "5-20 BYN",
                  address: {
                    "@type": "PostalAddress",
                    streetAddress: "ул. Примерная, 1",
                    addressLocality: "Крупки",
                    addressRegion: "Минская область",
                    postalCode: "222120",
                    addressCountry: "BY",
                  },
                  geo: {
                    "@type": "GeoCoordinates",
                    latitude: 54.3167,
                    longitude: 29.1333,
                  },
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
                  sameAs: [],
                  hasOfferCatalog: {
                    "@type": "OfferCatalog",
                    name: "Услуги заточки",
                    itemListElement: [
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Заточка кухонных ножей",
                          description: "Ручная профессиональная заточка кухонных ножей",
                        },
                        price: "10",
                        priceCurrency: "BYN",
                        availability: "https://schema.org/InStock",
                      },
                      {
                        "@type": "Offer",
                        itemOffered: {
                          "@type": "Service",
                          name: "Заточка цепей бензопил",
                          description: "Заточка цепей бензопил",
                        },
                        price: "9",
                        priceCurrency: "BYN",
                        availability: "https://schema.org/InStock",
                      },
                    ],
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}