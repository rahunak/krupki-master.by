import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import { SERVICES } from "@/data/services";
import { SITE_URL } from "@/data/contacts";
import { pageAlternates } from "@/lib/seo";

const service = SERVICES.santehnik;

// У услуги пока нет честной иллюстрации: OG-картинка падает на общую,
// чтобы не выдавать фото другой работы за сантехнику.
const ogImage = service.image ? `${SITE_URL}${service.image}` : `${SITE_URL}/og_image.png`;
const ogAlt = service.imageAlt ?? "Сантехнические работы в Крупках и районе";

export const metadata: Metadata = {
  title: service.title,
  description: service.description,
  alternates: pageAlternates(service.path),
  openGraph: {
    title: service.title,
    description: service.description,
    url: `${SITE_URL}${service.path}`,
    siteName: "Krupki Master",
    locale: "ru_BY",
    type: "website",
    images: [{ url: ogImage, width: 1600, height: 1000, alt: ogAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: service.title,
    description: service.description,
    images: [ogImage],
  },
};

export default function SantehnikPage() {
  return <ServicePageLayout service={service} />;
}
