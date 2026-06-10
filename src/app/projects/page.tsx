import type { Metadata } from "next";
import { CtaBand } from "@/components/marketing/cta-band";
import { ShowcaseGrid } from "@/components/marketing/showcase-grid";
import { Button } from "@/components/primitives/button";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/eyebrow";
import { Section } from "@/components/primitives/section";
import { projects } from "@/content/projects";
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
        <div className="page-hero-glow" aria-hidden="true" />
        <Container>
          <div className="page-hero-inner">
            <Eyebrow>Studio OSS family</Eyebrow>
            <h1 id="projects-title" className="page-hero-title">
              Selected work.
            </h1>
            <p className="page-hero-lead">
              Separate products over shared foundations: governed agents, trusted UI, durable
              coordination, temporal knowledge, and open agent society.
            </p>
            <div className="page-hero-actions">
              <Button href="/" variant="ghost" size="md">
                Back to studio
              </Button>
              <Button href={studioLinks.githubOrg} external variant="secondary" size="md" withArrow>
                GitHub organization
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <Section rhythm="default" aria-label="Project gallery">
        <ShowcaseGrid projects={projects} />
      </Section>

      <Section rhythm="default">
        <CtaBand
          eyebrow="Machine-readable"
          title="Reading this as an agent?"
          lead="The full family map, routes, and project summaries are published as stable, generated AI source files."
          primary={{ label: "Read AI index", href: "/llms.txt" }}
          secondary={{ label: "Back to studio", href: "/" }}
        />
      </Section>
    </>
  );
}
