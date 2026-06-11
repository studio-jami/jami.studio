import type { Metadata } from "next";
import { CTABand } from "@/components/marketing/cta-band";
import { ShowcaseGrid } from "@/components/marketing/showcase-grid";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
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
        <div className="page-hero-grid-bg" aria-hidden="true" />
        <Container className="page-hero-inner">
          <Eyebrow>Studio OSS family</Eyebrow>
          <h1 id="projects-title" className="page-hero-title">
            The project gallery.
          </h1>
          <p className="page-hero-lead">
            Separate products over shared foundations: governed agents, trusted UI, coordination,
            temporal knowledge, and open agent society. Each links to its own repository, docs, and
            live surface.
          </p>
        </Container>
      </section>

      <ShowcaseGrid heading={false} />

      <CTABand
        eyebrow="Read the source"
        title="Everything is generated from shared data."
        body="Routes, metadata, and AI-readable files all come from one content layer."
        primary={{ label: "Read AI index", href: "/llms.txt" }}
        secondary={{ label: "Back home", href: "/" }}
      />
    </>
  );
}
