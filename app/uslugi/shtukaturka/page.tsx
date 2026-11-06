import type { Metadata } from "next";
import ServicePageLayout from "@/components/services/ServicePageLayout";
import { SERVICES } from "@/data/services";
import { SITE_URL } from "@/data/contacts";
import { pageAlternates } from "@/lib/seo";

const service = SERVICES.shtukaturka;

export const metadata: Metadata = {
  title: `${service.title} | krupki-master.by`,
  description: service.description,
  alternates: pageAlternates(service.path),
  openGraph: {
    title: service.title,
    description: service.description,
    url: `${SITE_URL}${service.path}`,
    siteName: "Krupki Master",
    locale: "ru_BY",
    type: "website",
    images: [{ url: `${SITE_URL}${service.image}`, width: 1600, height: 1000, alt: service.imageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title: service.title,
    description: service.description,
    images: [`${SITE_URL}${service.image}`],
  },
};

export default function ShtukaturkaPage() {
  return <ServicePageLayout service={service} />;
}
