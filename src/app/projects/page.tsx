import type { Metadata } from "next";
import { ShowcaseGrid } from "@/components/marketing/showcase-grid";
import { CtaBand } from "@/components/marketing/cta-band";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/section-heading";
import { Reveal } from "@/components/system/reveal";
import { studioLinks } from "@/content/links";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: "Project index for the Studio OSS family.",
  path: "/projects"
});

export default function ProjectsPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="projects-title">
        <Container>
          <Reveal>
            <Eyebrow>Studio OSS family</Eyebrow>
            <h1 className="page-hero-title" id="projects-title">
              Selected work
            </h1>
            <p className="page-hero-lead">
              Separate products over shared foundations: governed agents, trusted UI,
              coordination, temporal knowledge, and open agent society. Each opens into its own
              case study.
            </p>
          </Reveal>
        </Container>
      </section>

      <ShowcaseGrid
        number="01"
        eyebrow="The portfolio"
        title="Five products in the family."
        titleId="projects-grid-title"
        className="showcase--index"
      />

      <CtaBand
        eyebrow="Read further"
        title="Resolve the whole family from one AI-readable source."
        titleId="projects-cta-title"
        actions={[
          { label: "Read AI index", href: "/llms.txt", variant: "primary" },
          { label: "View on GitHub", href: studioLinks.githubOrg, variant: "ghost" }
        ]}
      />
    </>
  );
}
