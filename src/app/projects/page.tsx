import type { Metadata } from "next";
import { Atmosphere } from "@/components/atmosphere/atmosphere";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ProjectGrid } from "@/components/marketing/project-grid";
import { CtaBand } from "@/components/marketing/cta-band";
import { projects } from "@/content/projects";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: "Project index for the Studio OSS family.",
  path: "/projects"
});

/**
 * `/projects` — the full portfolio gallery in Kirimo's idiom: an immersive grid of
 * all five projects under a strong editorial header, with the shared shell and a
 * closing CTA into the AI index.
 */
export default function ProjectsPage() {
  return (
    <>
      <section className="page-hero" aria-labelledby="projects-title">
        <Atmosphere variant="hero" />
        <Container width="wide">
          <div className="page-hero-inner">
            <Eyebrow index="—">The Studio OSS family</Eyebrow>
            <h1 id="projects-title" className="page-hero-title">
              Projects
            </h1>
            <p className="page-hero-lead">
              Separate products over shared foundations: governed agents, trusted UI, coordination,
              temporal knowledge, and open agent society.
            </p>
          </div>
        </Container>
      </section>

      <Section tone="canvas" aria-label="All projects" width="wide">
        <ProjectGrid projects={[...projects]} context="index" />
      </Section>

      <section className="section section-canvas section-tight" aria-labelledby="projects-cta-title">
        <Container width="wide">
          <CtaBand
            eyebrow="Resolve the family"
            title={<span id="projects-cta-title">Read the whole family as source.</span>}
            body="Every route, link, and summary on this site is generated from one set of shared content."
            actions={[
              { label: "Read AI index", href: "/llms.txt" },
              { label: "AI source bundle", href: "/llms-full.txt" }
            ]}
          />
        </Container>
      </section>
    </>
  );
}
