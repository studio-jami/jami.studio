import type { Metadata } from "next";
import { ProjectCard } from "@/components/marketing/project-card";
import { Container, Section } from "@/components/ui/layout";
import { Badge, GhostBadge } from "@/components/ui/primitives";
import { Reveal } from "@/components/system/reveal";
import { projects } from "@/content/projects";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: "Project index for the Studio OSS family.",
  path: "/projects"
});

/**
 * /projects — the full portfolio gallery. Same cinematic canvas as home; the
 * grid is the centerpiece, with grain + glow (in the fixed atmosphere layer)
 * doing the separation. One or two columns; generous spacing.
 */
export default function ProjectsPage() {
  return (
    <>
      <Section rhythm="flush" as="div">
        <Container as="div">
          <Reveal className="page-hero">
            <GhostBadge>Studio OSS family</GhostBadge>
            <h1>The full portfolio of agent-native foundations</h1>
            <p className="lead">
              Five separate products over shared foundations: governed agents, trusted UI,
              coordination, temporal knowledge, and open agent society.
            </p>
            <div className="page-hero-meta">
              <Badge tone="outline">Five products</Badge>
              <Badge tone="outline">One shared source</Badge>
              <Badge tone="outline">Open-core</Badge>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section rhythm="tight">
        <Container as="div">
          <Reveal>
            <div className="index-grid">
              {projects.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i + 1} span={3} />
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
