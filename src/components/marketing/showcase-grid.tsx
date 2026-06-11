import { Reveal } from "@/components/system/reveal";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/content/projects";
import { ProjectCard } from "./project-card";

/**
 * The selected-work centerpiece: the five Studio products as a portfolio grid. Reused composition;
 * the /projects index renders the same ProjectCard set without the home framing.
 */
export function ShowcaseGrid() {
  return (
    <Section id="work" aria-labelledby="work-title">
      <div className="showcase-head">
        <SectionHeading
          number="02"
          eyebrow="Selected work"
          title="The Studio project family"
          id="work-title"
        />
        <Button href="/projects" variant="link" icon="arrow">
          View all projects
        </Button>
      </div>
      <div className="project-grid">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={(index % 2) * 80}>
            <ProjectCard project={project} index={index} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
