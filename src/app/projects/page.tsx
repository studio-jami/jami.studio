import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { createMetadata } from "@/lib/metadata";
import { Container, Section } from "@/components/layout/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { ProjectCard } from "@/components/marketing/project-card";
import { CtaBand } from "@/components/marketing/cta-band";
import { site } from "@/content/site";
import { studioLinks } from "@/content/links";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: "Project index for the Studio OSS family.",
  path: "/projects"
});

/**
 * /projects — the full portfolio view in Noir's idiom: a numbered work grid (01–05)
 * of every product, sharing the global header/footer, closing on the standard CTA band.
 */
export default function ProjectsPage() {
  return (
    <>
      <header className="index-hero">
        <Container>
          <Eyebrow className="index-hero-eyebrow">
            <span className="section-number" aria-hidden="true">
              00
            </span>
            <span>Studio OSS family</span>
          </Eyebrow>
          <h1 className="index-hero-title">The work</h1>
          <p className="index-hero-lead">
            Separate products over shared foundations: governed agents, trusted UI,
            coordination, temporal knowledge, and open agent society.
          </p>
        </Container>
      </header>

      <Section className="work-section index-grid-section" ariaLabelledby="index-grid">
        <Container>
          <h2 id="index-grid" className="visually-hidden">
            All projects
          </h2>
          <ol className="work-grid">
            {projects.map((project, i) => (
              <li key={project.slug} className="work-grid-item">
                <ProjectCard project={project} index={String(i + 1).padStart(2, "0")} />
              </li>
            ))}
          </ol>
        </Container>
      </Section>

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
