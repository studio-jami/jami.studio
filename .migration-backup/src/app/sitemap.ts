import type { MetadataRoute } from "next";
import { publicRoutes, absoluteUrl } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes().map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: new Date("2026-06-06"),
    changeFrequency: "weekly",
    priority: route.path === "/" ? 1 : 0.8
  }));
}
