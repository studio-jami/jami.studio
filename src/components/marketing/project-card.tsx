import Link from "next/link";
import { Badge } from "@/components/primitives/badge";
import { projectRole } from "@/components/marketing/project-role";
import type { StudioProject } from "@/content/projects";
import { projectPath } from "@/lib/routes";

export function ProjectCard({
  project,
  index,
  featured = false,
  headingLevel: Heading = "h3"
}: {
  project: StudioProject;
  index: number;
  featured?: boolean;
  /**
   * Document-outline level for the card name. Defaults to h3 (cards sit under
   * an h2 section heading on the homepage); the /projects index passes h2 so
   * the outline stays ordered directly under the page h1.
   */
  headingLevel?: "h2" | "h3";
}) {
  const number = String(index + 1).padStart(2, "0");
  const tease = project.capabilities[0];

  return (
    <Link
      href={projectPath(project)}
      className={`project-card${featured ? " project-card--featured" : ""}`}
    >
      <div className="project-card__head">
        <span className="project-card__index" aria-hidden="true">
          {number}
        </span>
        <Badge tone="outline">{projectRole[project.slug]}</Badge>
      </div>

      <div className="project-card__body">
        <Heading className="project-card__name">{project.name}</Heading>
        <p className="project-card__summary">{project.summary}</p>
        {featured ? <p className="project-card__positioning">{project.positioning}</p> : null}
      </div>

      <div className="project-card__foot">
        <span className="project-card__tease">{tease}</span>
        <span className="project-card__cta">
          <span>Explore {project.shortName}</span>
          <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
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
