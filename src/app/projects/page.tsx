import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { createMetadata } from "@/lib/metadata";
import { Container } from "@/components/layout/container";
import { BandLabel } from "@/components/system/band-label";
import { WorkGrid } from "@/components/marketing/work-grid";
import { CtaBand } from "@/components/marketing/cta-band";
import { site } from "@/content/site";
import { studioLinks } from "@/content/links";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: "Project index for the Studio OSS family.",
  path: "/projects"
});

/**
 * /projects — the full portfolio in Noir's idiom: the colossal dotted WORKS band as the
 * page h1, the same asymmetric over-spaced photo grid, vertical guide-lines, closing on
 * the burst CTA. Shared header/footer + colossal wordmark.
 */
export default function ProjectsPage() {
  return (
    <>
      <header className="index-hero">
        <Container>
          <p className="index-hero-lead">
            Separate products over shared foundations: governed agents, trusted UI,
            coordination, temporal knowledge, and open agent society.
          </p>
        </Container>
        <BandLabel word="Works" count={projects.length} id="index-heading" as="h1" />
      </header>

      <WorkGrid />

      <CtaBand
        eyebrow="Go deeper"
        title="Read the machine-readable index."
        lead="Hand an agent the AI source files to resolve every project, route, and boundary from stable text."
        primary={site.home.secondaryCta}
        secondary={{ label: "GitHub", href: studioLinks.githubOrg }}
      />
    </>
  );
}
