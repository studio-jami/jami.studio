import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/marketing/project-card";
import type { StudioProject } from "@/content/projects";

type ProjectGridProps = {
  projects: StudioProject[];
  /** Section context — home reprise vs. the full `/projects` index. */
  context?: "home" | "index";
};

/**
 * The second showcase treatment — an immersive gallery grid that complements the
 * slider. On home it reprises the five projects and links into `/projects`; on the
 * index it is the full portfolio view. Two distinct showcase treatments (slider +
 * grid) is the Kirimo move.
 */
export function ProjectGrid({ projects, context = "home" }: ProjectGridProps) {
  return (
    <div className="project-gallery">
      {context === "home" ? (
        <SectionHeading
          index="05"
          eyebrow="The full family"
          titleId="gallery-title"
          title="Five projects, one coherent gallery."
          lead={
            <ButtonLink href="/projects" variant="secondary">
              View all projects
            </ButtonLink>
          }
        />
      ) : null}

      <ul className="project-grid">
        {projects.map((project, index) => (
          <li key={project.slug} className="project-grid-item">
            <ProjectCard project={project} index={index} variant="grid" />
          </li>
        ))}
      </ul>
    </div>
  );
}
