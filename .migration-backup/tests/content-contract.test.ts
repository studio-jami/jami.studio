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
      expect(project.repoUrl).toMatch(/^https:\/\/github\.com\/studio-jami\//);
      // Optional surfaces (subdomain/docs/api) are published only when they resolve.
      if (project.subdomain !== undefined) {
        expect(project.subdomain).toMatch(/\.jami\.studio$/);
        expect(project.domainTarget).toBe(`https://${project.subdomain}`);
      } else {
        expect(project.domainTarget).toBeUndefined();
      }
      if (project.docsUrl !== undefined) {
        expect(project.docsUrl).toMatch(/^https:\/\//);
      }
      if (project.apiUrl !== undefined) {
        expect(project.apiUrl).toMatch(/^https:\/\//);
      }
      expect(project.summary.length).toBeGreaterThan(20);
      expect(project.aiSummary.length).toBeGreaterThan(40);
      expect(project.ctas.some((cta) => cta.href === project.route)).toBe(true);
      expect(project.ctas.every((cta) => cta.href.length > 0)).toBe(true);
      expect(existsSync(join(process.cwd(), "public", project.socialImage))).toBe(true);
    }
  });

  it("publishes per-product subdomains only for live surfaces", () => {
    const withSubdomain = projects
      .filter((project) => project.subdomain !== undefined)
      .map((project) => project.slug)
      .sort();
    expect(withSubdomain).toEqual(["intercal", "registry"]);
  });

  it("derives public project URL targets through route helpers", () => {
    for (const project of projects) {
      expect(projectCanonicalUrl(project)).toBe(`https://www.jami.studio${project.route}`);
      expect(projectSubdomainUrl(project)).toBe(project.domainTarget);
      expect(projectRepositoryUrl(project)).toBe(project.repoUrl);
      expect(projectDocsUrl(project)).toBe(project.docsUrl);
      expect(projectApiUrl(project)).toBe(project.apiUrl);

      const expectedLabels = [
        "Route",
        ...(project.subdomain ? ["Subdomain"] : []),
        "Repository",
        ...(project.docsUrl ? ["Docs"] : []),
        ...(project.apiUrl ? ["API"] : [])
      ];
      expect(projectLinkTargets(project).map((target) => target.label)).toEqual(expectedLabels);

      for (const cta of project.ctas) {
        const expectedHrefByTarget = {
          route: project.route,
          subdomain: project.domainTarget,
          repo: project.repoUrl,
          docs: project.docsUrl,
          api: project.apiUrl
        };

        expect(cta.href).toBe(expectedHrefByTarget[cta.target]);
      }
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
