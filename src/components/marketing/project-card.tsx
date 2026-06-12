import Link from "next/link";
import type { StudioProject } from "@/content/projects";
import { projectPath } from "@/lib/routes";

type ProjectCardProps = {
  project: StudioProject;
  /** Two-digit numbered index for the work-grid spine (e.g. "01"). */
  index: string;
};

/**
 * The portfolio unit — one Studio product as a row in Noir's numbered work grid.
 * Whole card is a link into the case-study detail; the route comes from the content layer.
 */
export function ProjectCard({ project, index }: ProjectCardProps) {
  const tease = project.capabilities[0];

  return (
    <Link href={projectPath(project)} className="work-card" aria-label={`${project.name} — open project`}>
      <div className="work-card-top">
        <span className="work-card-index" aria-hidden="true">
          {index}
        </span>
        <span className="work-card-tag">{project.shortName}</span>
      </div>
      <div className="work-card-body">
        <h3 className="work-card-title">{project.name}</h3>
        <p className="work-card-summary">{project.summary}</p>
      </div>
      <div className="work-card-foot">
        <span className="work-card-tease">{tease}</span>
        <span className="work-card-open" aria-hidden="true">
          Open project
          <svg viewBox="0 0 16 16" width="14" height="14" fill="none">
            <path
              d="M3.5 8h9M8.5 4l4 4-4 4"
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
