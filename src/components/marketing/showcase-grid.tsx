import { ProjectCard } from "@/components/marketing/project-card";
import type { StudioProject } from "@/content/projects";

/**
 * ShowcaseGrid — the product-family centerpiece. Five projects on a six-column
 * rail: the first two run wider (span 3) as anchors, the remaining three run
 * span 2, so the grid breathes asymmetrically rather than reading as a uniform
 * 3-up. Used inside the home's third feature beat and the /projects index.
 */
export function ShowcaseGrid({ projects }: { projects: readonly StudioProject[] }) {
  return (
    <div className="showcase-grid">
      {projects.map((project, i) => (
        <ProjectCard
          key={project.slug}
          project={project}
          index={i + 1}
          span={i < 2 ? 3 : 2}
        />
      ))}
    </div>
  );
}
