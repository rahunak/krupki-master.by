import type { MetadataRoute } from "next";

const BLOG_POSTS = [
  "zatochka-cepi-benzopily",
  "ugol-zatochki-nozha",
  "ruchnaya-ili-mashinnaya-zatochka",
  "kak-otpravit-instrument-belpochtoy",
  "skolko-stoit-zatochka",
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
