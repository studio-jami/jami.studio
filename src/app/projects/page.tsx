import type { Metadata } from "next";
import { CTABand } from "@/components/marketing/cta-band";
import { ShowcaseGrid } from "@/components/marketing/showcase-grid";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/system/reveal";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: "Project index for the Studio OSS family.",
  path: "/projects"
});

export default function ProjectsPage() {
  return (
    <>
      <section className="section section--tight" aria-labelledby="projects-title">
        <Container>
          <Reveal className="section-head">
            <Eyebrow>Studio OSS family</Eyebrow>
            <h1 id="projects-title">Projects</h1>
            <p>
              Separate products over shared foundations: governed agents, trusted UI,
              coordination, temporal knowledge, and open agent society. Each links out to its
              own repository, docs, and live surface.
            </p>
          </Reveal>
        </Container>
      </section>

      <ShowcaseGrid variant="index" />

      <CTABand
        eyebrow="Go deeper"
        title="Read the machine-readable source"
        lead="The same data that builds these pages is published as an AI index for agents."
        primary={{ label: "Read AI index", href: "/llms.txt" }}
        secondary={{ label: "Back home", href: "/" }}
      />
    </>
  );
}
