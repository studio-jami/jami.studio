import { projects } from "@/content/projects";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/system/section-heading";
import { ProjectCard } from "@/components/marketing/project-card";
import { Button } from "@/components/ui/button";

/**
 * Project Section → the five products as a numbered "selected work" grid (01–05).
 * The centerpiece of the dark agency-portfolio IA. Each card routes to its case study
 * via the content/route layer.
 */
export function NumberedWorkGrid() {
  return (
    <Section className="work-section" ariaLabelledby="work-heading">
      <Container>
        <SectionHeading
          index="01"
          eyebrow="Selected work"
          id="work-heading"
          title="Five products, one shared source."
          align="between"
          lead="The Studio family as a portfolio: each is its own implementation surface, presented here with a stable route, repository, and docs."
        >
          <Button href="/projects" variant="ghost">
            View all projects
          </Button>
        </SectionHeading>

        <ol className="work-grid">
          {projects.map((project, i) => (
            <li key={project.slug} className="work-grid-item">
              <ProjectCard project={project} index={String(i + 1).padStart(2, "0")} />
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
