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

export const metadata: Metadata = {
  title: "Krupki Master - Профессиональная заточка ножей и инструмента",
  description: "Заточка ножей, цепей, садового инструмента в Крупках. Доставка по всей Беларуси.",
  keywords: ["заточка ножей", "Крупки", "Беларусь", "заточка инструмента", "Белпочта", "СДЭК", "доставка"],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Krupki Master - Профессиональная заточка ножей и инструмента",
    description: "Заточка ножей, цепей, садового инструмента в Крупках. Доставка по всей Беларуси.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`${geistSans.variable} ${geistMono.variable}`}
      style={{ scrollBehavior: "smooth" }}
    >
      <body>{children}</body>
    </html>
  );
}
