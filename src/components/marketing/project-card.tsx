import Link from "next/link";
import { Tag } from "@/components/ui/eyebrow";
import { formatIndex } from "@/components/ui/section-heading";
import type { StudioProject } from "@/content/projects";
import { projectPath } from "@/lib/routes";

type ProjectCardProps = {
  project: StudioProject;
  /** 1-based position used for the editorial index marker. */
  position: number;
  /**
   * `row` — the home "selected work" ledger entry.
   * `card` — the gallery panel used on the projects index.
   */
  variant?: "row" | "card";
};

/**
 * The portfolio unit: one Studio product, entirely fed by the registry data.
 * Uses a stretched link so the whole surface is clickable while the heading
 * structure stays clean for human and agent readers.
 */
export function ProjectCard({ project, position, variant = "card" }: ProjectCardProps) {
  const index = formatIndex(position);

  if (variant === "row") {
    return (
      <article className="work-row">
        <span className="work-no" aria-hidden="true">
          {index}
        </span>
        <div className="work-main">
          <h3 className="work-name">
            <Link href={projectPath(project)} className="stretched-link">
              {project.name}
            </Link>
          </h3>
          <p className="work-sum">{project.summary}</p>
        </div>
        <span className="work-host">{project.subdomain}</span>
        <span className="work-arrow" aria-hidden="true">
          →
        </span>
      </article>
    );
  }

  return (
    <article className="project-card">
      <div className="project-card-top">
        <span className="card-no" aria-hidden="true">
          {index}
        </span>
        <Tag>{project.shortName}</Tag>
      </div>
      <h3 className="card-name">
        <Link href={projectPath(project)} className="stretched-link">
          {project.name}
        </Link>
      </h3>
      <p className="card-sum">{project.summary}</p>
      <p className="card-pos">{project.positioning}</p>
      <ul className="card-caps" aria-label={`${project.shortName} capability highlights`}>
        {project.capabilities.slice(0, 2).map((capability) => (
          <li key={capability}>{capability}</li>
        ))}
      </ul>
      <div className="card-foot">
        <span className="card-cta">
          Case study
          <span aria-hidden="true"> →</span>
        </span>
        <span className="card-host">{project.subdomain}</span>
      </div>
    </article>
  );
}
