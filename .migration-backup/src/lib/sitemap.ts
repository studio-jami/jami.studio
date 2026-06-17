import { absoluteUrl, publicRoutes } from "@/lib/routes";

export function createSitemapXml(): string {
  const urls = publicRoutes()
    .map(
      (route) => `  <url>
    <loc>${absoluteUrl(route.path)}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route.path === "/" ? "1.0" : "0.8"}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
