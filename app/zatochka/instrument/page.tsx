import type { Metadata } from "next";
import ZatochkaPageLayout from "@/components/zatochka/ZatochkaPageLayout";
import { ZATOCHKA_PAGES } from "@/data/zatochka";
import { SITE_URL } from "@/data/contacts";
import { pageAlternates } from "@/lib/seo";

const page = ZATOCHKA_PAGES.instrument;

export const metadata: Metadata = {
  title: `${page.title} | krupki-master.by`,
  description: page.description,
  alternates: pageAlternates(page.path),
  openGraph: {
    title: page.title,
    description: page.description,
    url: `${SITE_URL}${page.path}`,
    siteName: "Krupki Master",
    locale: "ru_BY",
    type: "website",
    images: [{ url: `${SITE_URL}/og_image.png`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: page.title,
    description: page.description,
    images: [`${SITE_URL}/og_image.png`],
  },
};

export default function InstrumentPage() {
  return <ZatochkaPageLayout page={page} />;
}
