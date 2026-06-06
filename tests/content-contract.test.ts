import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { projects } from "@/content/projects";
import { publicRoutes } from "@/lib/routes";

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
      expect(project.summary.length).toBeGreaterThan(20);
      expect(project.aiSummary.length).toBeGreaterThan(40);
      expect(existsSync(join(process.cwd(), "public", project.socialImage))).toBe(true);
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
