import Link from "next/link";
import type { StudioProject } from "@/content/projects";
import { projectPath } from "@/lib/routes";

/**
 * The portfolio unit: one Studio product. Name, summary, positioning hook, a
 * capability tease, and a CTA into the detail route. The whole card links to the
 * project route (resolved via projectPath — never a hand-built href).
 */
export function ProjectCard({ project, index }: { project: StudioProject; index?: number }) {
  const number = typeof index === "number" ? String(index + 1).padStart(2, "0") : null;

  return (
    <article className="project-card">
      <Link href={projectPath(project)} className="project-card-link" aria-label={`Open ${project.name}`}>
        <div className="project-card-top">
          <span className="project-card-name">
            {number ? <span className="project-card-number">{number}</span> : null}
            {project.shortName}
          </span>
        </div>
        <h3 className="project-card-title">{project.name}</h3>
        <p className="project-card-summary">{project.summary}</p>
        <p className="project-card-positioning">{project.positioning}</p>
        <ul className="project-card-caps">
          {project.capabilities.slice(0, 3).map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>
        <span className="project-card-cta">
          Explore {project.shortName}
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M3 8h9M8 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </Link>
    </article>
  );
}
