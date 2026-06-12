import Link from "next/link";
import type { StudioProject } from "@/content/projects";
import { Badge } from "@/components/ui/badge";

type ProjectCardProps = {
  project: StudioProject;
  /** Ordinal shown as the editorial number (01 / 02 …). */
  index: number;
  /** Visual treatment: a slide in the showcase, a grid tile, or the index list. */
  variant?: "slide" | "grid";
};

/**
 * The portfolio unit — one Studio product. Carries name, summary, a positioning
 * hook, a capability tease, and a CTA into the detail route. Looks intentional as
 * a slider slide, a gallery tile, or standalone; variant is a prop, never a fork.
 */
export function ProjectCard({ project, index, variant = "grid" }: ProjectCardProps) {
  const ordinal = String(index + 1).padStart(2, "0");

  return (
    <article className={`project-card project-card-${variant}`}>
      <Link href={project.route} className="project-card-link" aria-label={`Open ${project.name}`}>
        <div className="project-card-top">
          <span className="project-card-index">{ordinal}</span>
          <Badge tone="outline">{project.shortName}</Badge>
        </div>

        <div className="project-card-body">
          <h3 className="project-card-name">{project.name}</h3>
          <p className="project-card-summary">{project.summary}</p>
          <p className="project-card-hook">{project.positioning}</p>
        </div>

        <ul className="project-card-tags" aria-label={`${project.name} capabilities`}>
          {project.capabilities.slice(0, 2).map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>

        <span className="project-card-cta">
          <span>Open project</span>
          <span className="project-card-arrow" aria-hidden="true">
            →
          </span>
        </span>
      </Link>
    </article>
  );
}
