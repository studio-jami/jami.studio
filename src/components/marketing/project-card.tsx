import Link from "next/link";
import type { StudioProject } from "@/content/projects";
import { projectPath } from "@/lib/routes";
import { Badge } from "@/components/ui/primitives";

const statusLabel: Record<StudioProject["internalStatus"], string> = {
  live: "Live surface",
  foundation: "Foundation",
  planned: "On the map"
};

/**
 * ProjectCard — the portfolio unit. Renders one Studio product as a showcase
 * card: index, name, summary, a positioning hook, capability tags, and a
 * route-resolved CTA. `span` sizes the card inside the showcase grid. The whole
 * card is a stretched link target; the CTA is a visual affordance.
 */
export function ProjectCard({
  project,
  index,
  span = 3
}: {
  project: StudioProject;
  index: number;
  span?: 2 | 3;
}) {
  const href = projectPath(project);
  const tags = project.capabilities.slice(0, 2);

  return (
    <article className={`project-card project-card-span-${span}`}>
      <div className="project-card-head">
        <span className="project-card-index">
          {String(index).padStart(2, "0")} / {project.shortName}
        </span>
        <Badge tone="outline">{statusLabel[project.internalStatus]}</Badge>
      </div>

      <h3>{project.name}</h3>
      <p className="project-card-summary">{project.summary}</p>
      <p className="project-card-positioning">{project.positioning}</p>

      <div className="project-card-tags">
        {tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      <div className="project-card-foot">
        <span className="project-card-cta">
          Open project
          <span className="project-card-cta-arrow" aria-hidden="true">
            →
          </span>
        </span>
      </div>

      <Link
        href={href}
        className="project-card-stretch"
        aria-label={`Open ${project.name}`}
      />
    </article>
  );
}
