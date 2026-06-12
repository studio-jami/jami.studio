import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Divider } from "@/components/layout/divider";
import { Section } from "@/components/layout/section";
import { CtaBand } from "@/components/marketing/cta-band";
import { ProjectCard } from "@/components/marketing/project-card";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/content/projects";
import { createMetadata } from "@/lib/metadata";
import { studioLinks } from "@/content/links";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: "Project index for the Studio OSS family.",
  path: "/projects"
});

export default function ProjectsPage() {
  return (
    <>
      <Container>
        <section className="lattice page-hero" aria-labelledby="projects-title">
          <Eyebrow>Studio OSS family</Eyebrow>
          <h1 id="projects-title">Projects</h1>
          <p className="lead">
            Separate products over shared foundations: governed agents, trusted UI, coordination,
            temporal knowledge, and open agent society. Every link below resolves through the same
            centralized route and metadata layer.
          </p>
        </section>
      </Container>

      <Container>
        <Divider />
      </Container>

      <Section id="all-projects" label="All Studio projects">
        <SectionHeading
          index="01"
          eyebrow="The portfolio"
          title="Five products, one family"
          lead="Open any project for its positioning, capabilities, proof posture, and public links."
          align="start"
        />
        <div className="index-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </Section>

      <Container>
        <Divider />
      </Container>

      <CtaBand
        eyebrow="Read more"
        title="Pull the whole family as text"
        lead="The AI index and full source bundle expose every route, summary, and source boundary as stable generated text."
        primary={{ label: "Read AI index", href: "/llms.txt" }}
        secondary={{ label: "GitHub", href: studioLinks.githubOrg, external: true }}
      />
    </>
  );
}
