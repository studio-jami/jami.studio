import type { Metadata } from "next";
import { CTABand } from "@/components/marketing/cta-band";
import { ProjectCard } from "@/components/marketing/project-card";
import { Reveal } from "@/components/system/reveal";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
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
          <div className="page-hero-inner">
            <Eyebrow accent>Studio OSS family</Eyebrow>
            <h1 id="projects-title">Projects</h1>
            <p className="page-hero-lead">
              Separate products over a shared foundation: governed agents, trusted interfaces,
              multi-agent coordination, temporal knowledge, and open agent society.
            </p>
          </div>
        </Container>
      </section>

      <Section aria-label="All projects" className="section--flush-top">
        <div className="project-grid project-grid--index">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={(index % 2) * 80}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section aria-label="Get started">
        <Reveal>
          <CTABand
            title="Read the AI index, or open the repositories"
            body="Every project links out to its own repository, docs, API, and live surface through centralized metadata."
            primary={site.home.secondaryCta}
            secondary={{ label: "Back to home", href: "/" }}
          />
        </Reveal>
      </Section>
    </>
  );
}
