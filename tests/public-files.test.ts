import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { createLlmsFullTxt, createLlmsTxt } from "@/lib/ai-public-files";
import { createSitemapXml } from "@/lib/sitemap";

describe("generated public files", () => {
  it("generates AI-readable route and project coverage", () => {
    const llms = createLlmsTxt();
    const full = createLlmsFullTxt();

    for (const project of projects) {
      expect(llms).toContain(project.name);
      expect(full).toContain(project.repoUrl);
      expect(full).toContain(project.docsUrl);
    }
  });

  it("generates sitemap coverage for every project route", () => {
    const sitemap = createSitemapXml();

    expect(sitemap).toContain("https://www.jami.studio/");
    for (const project of projects) {
      expect(sitemap).toContain(`https://www.jami.studio${project.route}`);
    }
  });
});
