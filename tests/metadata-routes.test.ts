import { describe, expect, it } from "vitest";
import { projects } from "@/content/projects";
import { createProjectMetadata, projectJsonLd } from "@/lib/metadata";
import { absoluteUrl, publicRoutes } from "@/lib/routes";

describe("route metadata contract", () => {
  it("keeps every public route canonical under the site host", () => {
    for (const route of publicRoutes()) {
      expect(absoluteUrl(route.path)).toMatch(/^https:\/\/www\.jami\.studio\//);
      expect(route.description.length).toBeGreaterThan(20);
    }
  });

  it("generates project metadata from project registry data", () => {
    for (const project of projects) {
      const metadata = createProjectMetadata(project);

      expect(metadata.title).toBe(`${project.name} | jami.studio`);
      expect(metadata.description).toBe(project.summary);
      expect(metadata.alternates?.canonical).toBe(absoluteUrl(project.route));
      expect(metadata.openGraph?.images).toEqual([
        { url: absoluteUrl(project.socialImage), width: 1200, height: 630 }
      ]);
      expect(metadata.twitter?.images).toEqual([absoluteUrl(project.socialImage)]);
    }
  });

  it("generates conservative project JSON-LD without runtime implementation claims", () => {
    for (const project of projects) {
      const jsonLd = projectJsonLd(project);

      expect(jsonLd).toMatchObject({
        "@context": "https://schema.org",
        "@type": "SoftwareSourceCode",
        name: project.name,
        description: project.summary,
        url: absoluteUrl(project.route),
        codeRepository: project.repoUrl
      });
      expect(jsonLd).not.toHaveProperty("programmingLanguage");
    }
  });
});
