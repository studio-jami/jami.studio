import type { Metadata } from "next";
import { CTABand } from "@/components/marketing/cta-band";
import { ShowcaseGrid } from "@/components/marketing/showcase-grid";
import { Reveal } from "@/components/system/reveal";
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
        <div className="hero-glow" aria-hidden="true" />
        <Container className="page-hero-inner">
          <Eyebrow>Studio OSS family</Eyebrow>
          <h1 id="projects-title" className="page-hero-title">
            Selected work, built as products.
          </h1>
          <p className="page-hero-lead">
            Separate products over shared foundations: governed agents, trusted UI, coordination,
            temporal knowledge, and open agent society.
          </p>
        </Container>
      </section>

      <section className="section project-index" aria-label="All Studio projects">
        <Container>
          <Reveal>
            <ShowcaseGrid withHeading={false} />
          </Reveal>
        </Container>
      </section>

      <Reveal>
        <CTABand
          eyebrow="Read the source"
          title="Every project, in one AI-readable index."
          lead="The same centralized metadata that builds these pages also publishes the agent index."
          primary={{ label: "Read AI index", href: "/llms.txt" }}
          secondary={{ label: "Back to home", href: "/" }}
        />
      </Reveal>
    </>
  );
}
