import type { Metadata } from "next";
import { Container } from "@/components/primitives/container";
import { Eyebrow } from "@/components/primitives/section-heading";
import { Reveal } from "@/components/system/reveal";
import { ProjectCard } from "@/components/marketing/project-card";
import { CtaCard } from "@/components/marketing/cta-card";
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
        <div className="page-hero-atmosphere" aria-hidden="true" />
        <Container>
          <Reveal>
            <Eyebrow>The family</Eyebrow>
            <h1 className="page-hero-title" id="projects-title">
              Five products, one foundation.
            </h1>
            <p className="page-hero-lead">
              Separate products over shared foundations: governed agents, trusted UI,
              coordination, temporal knowledge, and open agent society. Each opens into its own
              case study.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="section section--tight" aria-label="All projects">
        <Container>
          <div className="family-masonry">
            {projects.map((project, index) => (
              <Reveal key={project.slug} delay={(index % 3) * 70}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaCard
        eyebrow="Read further"
        title="Resolve the whole family from one AI-readable source."
        titleId="projects-cta-title"
        photo="/assets/cta.png"
        actions={[
          { label: "Read AI index", href: "/llms.txt", variant: "primary" },
          { label: "View on GitHub", href: studioLinks.githubOrg, variant: "ghost" }
        ]}
      />
    </>
  );
}
