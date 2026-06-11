import Link from "next/link";
import type { Route } from "next";
import { Badge } from "@/components/ui/badge";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { StudioProject } from "@/content/projects";
import { projectPath } from "@/lib/routes";

type ProjectCardProps = {
  project: StudioProject;
  /** Optional index for a Kirimo-style numbered marker. */
  index?: number;
};

/**
 * The portfolio unit — one Studio product. Name, summary, positioning hook, a capability
 * tease (first two capabilities as tags), and a whole-card link into the detail page.
 * Borrows Kirimo's "Project Card" rhythm: number, oversized title, disciplines, hover lift.
 */
export function ProjectCard({ project, index }: ProjectCardProps) {
  const tags = project.capabilities.slice(0, 2);

  return (
    <article className="project-card">
      <Link href={projectPath(project) as Route} className="project-card-link">
        <div className="project-card-head">
          <Eyebrow
            number={typeof index === "number" ? String(index + 1).padStart(2, "0") : undefined}
          >
            {project.shortName}
          </Eyebrow>
          <span className="project-card-arrow" aria-hidden="true">
            ↗
          </span>
        </div>

        <h3 className="project-card-title">{project.name}</h3>
        <p className="project-card-summary">{project.summary}</p>
        <p className="project-card-positioning">{project.positioning}</p>

        <ul className="project-card-tags">
          {tags.map((tag) => (
            <li key={tag}>
              <Badge variant="outline">{tag}</Badge>
            </li>
          ))}
        </ul>

        <span className="project-card-cta">Explore {project.shortName}</span>
      </Link>
    </article>
  );
}
