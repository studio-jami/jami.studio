import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { createLlmsFullTxt, createLlmsTxt } from "@/lib/ai-public-files";
import { absoluteUrl, publicRoutes } from "@/lib/routes";
import { createSitemapXml } from "@/lib/sitemap";

describe("generated public files", () => {
  it("generates AI-readable route and project coverage", () => {
    const llms = createLlmsTxt();
    const full = createLlmsFullTxt();

    for (const route of publicRoutes()) {
      expect(llms).toContain(`[${route.label}](${absoluteUrl(route.path)})`);
    }

    for (const project of projects) {
      expect(llms).toContain(project.name);
      expect(full).toContain(project.repoUrl);
      expect(full).toContain(project.docsUrl);
      expect(full).toContain(project.apiUrl);
      expect(full).toContain(project.domainTarget);
      for (const cta of project.ctas) {
        expect(full).toContain(`${cta.label}: ${cta.href}`);
      }
    }
  });

  it("generates sitemap coverage for every public route", () => {
    const sitemap = createSitemapXml();

    for (const route of publicRoutes()) {
      expect(sitemap).toContain(`<loc>${absoluteUrl(route.path)}</loc>`);
    }
  });
});
