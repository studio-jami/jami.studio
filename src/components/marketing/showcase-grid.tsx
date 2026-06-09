import { ProjectCard } from "@/components/marketing/project-card";
import type { StudioProject } from "@/content/projects";

export function ShowcaseGrid({ projects }: { projects: StudioProject[] }) {
  return (
    <div className="showcase-grid">
      {projects.map((project) => (
        <ProjectCard key={project.slug} project={project} />
      ))}
    </div>
  );
}
