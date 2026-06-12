import Link from "next/link";
import type { Route } from "next";
import { Badge } from "@/components/primitives/badge";
import type { StudioProject } from "@/content/projects";

const statusLabel: Record<StudioProject["internalStatus"], string> = {
  planned: "In design",
  foundation: "Foundation",
  live: "Live surface"
};

/**
 * The portfolio unit — one Studio product as an editorial "selected work" card.
 * Numbered, with name, summary, a positioning hook, a capability tease, and the whole
 * card linking into the project detail. Looks intentional in a grid and standalone.
 */
export function ProjectCard({
  project,
  index
}: {
  project: StudioProject;
  index: number;
}) {
  const number = String(index + 1).padStart(2, "0");
  const teaser = project.capabilities[0];

  return (
    <article className="project-card">
      <Link href={project.route as Route} className="project-card-link" aria-label={`Open ${project.name}`}>
        <div className="project-card-top">
          <span className="project-card-num">{number}</span>
          <Badge variant="outline">{statusLabel[project.internalStatus]}</Badge>
        </div>

        <div className="project-card-body">
          <h3 className="project-card-name">{project.name}</h3>
          <p className="project-card-summary">{project.summary}</p>
          <p className="project-card-positioning">{project.positioning}</p>
        </div>

        <div className="project-card-foot">
          <span className="project-card-teaser">{teaser}</span>
          <span className="project-card-cta" aria-hidden="true">
            Open project <span className="project-card-arrow">→</span>
          </span>
        </div>
      </Link>
    </article>
  );
}
