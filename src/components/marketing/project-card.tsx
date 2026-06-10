import Link from "next/link";
import { Badge } from "@/components/primitives/badge";
import type { StudioProject } from "@/content/projects";
import { projectPath } from "@/lib/routes";

const statusLabel: Record<StudioProject["internalStatus"], string> = {
  live: "Live",
  foundation: "Foundation",
  planned: "Planned"
};

type ProjectCardProps = {
  project: StudioProject;
  /** Index drives the mono section number stamped on the card. */
  index?: number;
  /** Featured cards span wider in the showcase grid and surface more detail. */
  featured?: boolean;
};

/**
 * The portfolio unit: one Studio product as a gallery card. Name, summary,
 * positioning hook, a capability tease, and a single CTA into the detail page.
 * All copy + the route come from the project registry — nothing is hardcoded.
 */
export function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const number = typeof index === "number" ? String(index + 1).padStart(2, "0") : undefined;

  return (
    <Link
      href={projectPath(project)}
      className={["project-card", featured ? "project-card--featured" : ""]
        .filter(Boolean)
        .join(" ")}
      aria-label={`Open ${project.name}`}
    >
      <div className="project-card-top">
        {number ? <span className="project-card-index">{number}</span> : null}
        <Badge tone="outline">{statusLabel[project.internalStatus]}</Badge>
      </div>

      <div className="project-card-body">
        <h3 className="project-card-name">{project.name}</h3>
        <p className="project-card-summary">{project.summary}</p>
        {featured ? <p className="project-card-positioning">{project.positioning}</p> : null}
      </div>

      <div className="project-card-foot">
        <ul className="project-card-caps">
          {project.capabilities.slice(0, featured ? 3 : 2).map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>
        <span className="project-card-cta">
          Explore {project.shortName}
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false">
            <path
              d="M3 8h9M8.5 4l4 4-4 4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
