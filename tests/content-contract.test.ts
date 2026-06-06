import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import {
  projectApiUrl,
  projectCanonicalUrl,
  projectDocsUrl,
  projectLinkTargets,
  projectRepositoryUrl,
  projectSubdomainUrl,
  publicRoutes
} from "@/lib/routes";

describe("project content contract", () => {
  it("keeps the required Studio project roster", () => {
    expect(projects.map((project) => project.slug)).toEqual([
      "harness",
      "registry",
      "orchestra",
      "intercal",
      "collectiva"
    ]);
  });

  it("centralizes public project route and link data", () => {
    for (const project of projects) {
      expect(project.route).toBe(`/projects/${project.slug}`);
      expect(project.subdomain).toMatch(/\.jami\.studio$/);
      expect(project.domainTarget).toMatch(/^https:\/\//);
      expect(project.repoUrl).toMatch(/^https:\/\/github\.com\/studio-jami\//);
      expect(project.docsUrl).toMatch(/^https:\/\//);
      expect(project.apiUrl).toMatch(/^https:\/\//);
      expect(project.summary.length).toBeGreaterThan(20);
      expect(project.aiSummary.length).toBeGreaterThan(40);
      expect(project.ctas.some((cta) => cta.href === project.route)).toBe(true);
      expect(existsSync(join(process.cwd(), "public", project.socialImage))).toBe(true);
    }
  });

  it("derives public project URL targets through route helpers", () => {
    for (const project of projects) {
      expect(projectCanonicalUrl(project)).toBe(`https://www.jami.studio${project.route}`);
      expect(projectSubdomainUrl(project)).toBe(project.domainTarget);
      expect(projectRepositoryUrl(project)).toBe(project.repoUrl);
      expect(projectDocsUrl(project)).toBe(project.docsUrl);
      expect(projectApiUrl(project)).toBe(project.apiUrl);
      expect(projectLinkTargets(project).map((target) => target.label)).toEqual([
        "Route",
        "Subdomain",
        "Repository",
        "Docs",
        "API"
      ]);
    }
  });
});

describe("site content contract", () => {
  it("centralizes homepage FAQ content", () => {
    expect(site.faqs.length).toBeGreaterThanOrEqual(3);
    for (const faq of site.faqs) {
      expect(faq.question.length).toBeGreaterThan(10);
      expect(faq.answer.length).toBeGreaterThan(60);
    }
  });
});

describe("public route contract", () => {
  it("covers home, index, and every project page", () => {
    const paths = publicRoutes().map((route) => route.path);

    expect(paths).toContain("/");
    expect(paths).toContain("/projects");
    for (const project of projects) {
      expect(paths).toContain(project.route);
    }
  });
});
