import type { MetadataRoute } from "next";

const BLOG_POSTS = [
  "chto-takoe-menazhnitsa",
  "zatochka-cepi-benzopily",
  "ugol-zatochki-nozha",
  "ruchnaya-ili-mashinnaya-zatochka",
  "kak-otpravit-instrument-belpochtoy",
  "skolko-stoit-zatochka",
];

// TEMP-GIFT: /doski/podarochnye_nabory временно исключён из sitemap (нет товара/фото)
const BOARD_PAGES = [
  "doski",
  "doski/razdelochnye",
  "doski/menazhnitsy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://krupki-master.by";
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...BOARD_PAGES.map((slug) => ({
      url: `${baseUrl}/${slug}/`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: slug === "doski" ? 0.8 : 0.7,
    })),
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...BLOG_POSTS.map((slug) => ({
      url: `${baseUrl}/blog/${slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
