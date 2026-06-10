import { ProjectCard, type ProjectCardHeadingLevel } from "@/components/marketing/project-card";
import type { StudioProject } from "@/content/projects";

export function ShowcaseGrid({
  projects,
  headingLevel
}: {
  projects: StudioProject[];
  headingLevel?: ProjectCardHeadingLevel;
}) {
  return (
    <div className="showcase-grid">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} headingLevel={headingLevel} />
      ))}
    </div>
  );
}
