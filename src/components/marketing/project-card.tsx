import Link from "next/link";
import type { Route } from "next";
import type { StudioProject } from "@/content/projects";

const statusLabel = {
  planned: "In design",
  foundation: "Foundation",
  live: "Live"
} as const;

/**
 * ProjectCard — the real work card used in the home "Testimonials" masonry slot and the
 * /projects index. A charcoal Surface card on the void with a hairline seam: monogram
 * mark, status, name, summary, positioning, and a "view case study" affordance. No
 * fabricated quotes — these are the five real Studio products.
 */
export function ProjectCard({ project }: { project: StudioProject }) {
  return (
    <article className="project-card">
      <Link
        href={project.route as Route}
        className="project-card-link"
        aria-label={`View ${project.name} case study`}
      >
        <div className="project-card-top">
          <span className="project-card-mark" aria-hidden="true">
            {project.shortName.charAt(0)}
          </span>
          <span className="project-card-status">{statusLabel[project.internalStatus]}</span>
        </div>

        <div className="project-card-body">
          <h3 className="project-card-name">{project.name}</h3>
          <p className="project-card-summary">{project.summary}</p>
          <p className="project-card-positioning">{project.positioning}</p>
        </div>

        <div className="project-card-foot">
          <span className="project-card-meta">{project.subdomain}</span>
          <span className="project-card-cta">
            Case study
            <span className="project-card-arrow" aria-hidden="true">
              →
            </span>
          </span>
        </div>
      </Link>
    </article>
  );
}
