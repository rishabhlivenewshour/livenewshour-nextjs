import { MetadataRoute } from "next";
import { SEO_CONFIG } from "@/lib/seo.config";
import { getArticles } from "@/services/article.service";
import { readCategories } from "@/lib/category.read";

/**
 * Dynamic Sitemap Generator
 * Automatically generates sitemap.xml with all pages
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SEO_CONFIG.siteUrl;

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.5,
    },
  ];

  // Fetch categories
  let categoryPages: MetadataRoute.Sitemap = [];
  try {
    const categories = await readCategories();
    categoryPages = categories.map((category) => ({
      url: `${baseUrl}/news/topics/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.error("Error fetching categories for sitemap:", error);
  }

  // Fetch articles (you may want to paginate this for large sites)
  let articlePages: MetadataRoute.Sitemap = [];
  try {
    // Fetch first 1000 articles (adjust based on your needs)
    const { articles } = await getArticles({ page: 1, pageSize: 5000 });
    articlePages = articles.map((article) => ({
      url: `${baseUrl}/news/articles/${article.slug}`,
      lastModified: new Date(article.published_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Error fetching articles for sitemap:", error);
  }

  return [...staticPages, ...categoryPages, ...articlePages];
}

/**
 * Revalidate sitemap every hour
 * For very large sites, consider splitting into multiple sitemaps
 * https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap#generate-multiple-sitemaps
 */
export const revalidate = 3600; // 1 hour
