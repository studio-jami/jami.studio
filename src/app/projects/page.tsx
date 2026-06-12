import type { Metadata } from "next";
import { ProjectCard } from "@/components/marketing/project-card";
import { Container, Section } from "@/components/ui/layout";
import { GhostBadge } from "@/components/ui/primitives";
import { Reveal } from "@/components/system/reveal";
import { projects } from "@/content/projects";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: "Project index for the Studio OSS family.",
  path: "/projects"
});

/**
 * /projects — a cinematic gallery of the five products on the warm-black
 * canvas: ghost-pill label, two-tone heading, generous spacing, and the
 * oversized 48px-radius matte cards in a two-column flow. Grain + glow (the
 * fixed atmosphere layer) do the separation.
 */
export default function ProjectsPage() {
  return (
    <>
      <Section rhythm="flush" as="div">
        <Container as="div">
          <Reveal className="page-hero">
            <GhostBadge>The product family</GhostBadge>
            <h1>
              Five products, <span className="heading-soft">one quiet foundation.</span>
            </h1>
            <p className="lead">
              Separate implementation surfaces over shared foundations: governed agents, trusted
              UI, coordination, temporal knowledge, and open agent society.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section rhythm="tight">
        <Container as="div">
          <div className="index-grid">
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={(i % 2) * 80}>
                <ProjectCard project={project} index={i + 1} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
