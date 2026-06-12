import Link from "next/link";
import type { StudioProject } from "@/content/projects";
import { projectPath } from "@/lib/routes";
import { Badge } from "@/components/ui/primitives";
import { ArrowRightIcon } from "@/components/ui/icons";

const statusLabel: Record<StudioProject["internalStatus"], string> = {
  live: "Live surface",
  foundation: "Foundation",
  planned: "On the map"
};

/**
 * ProjectCard — the portfolio unit on the 48px-radius matte surface: index +
 * status row, display name, summary, positioning hook, capability tags, and a
 * route-resolved affordance. The whole card is a stretched link target.
 */
export function ProjectCard({ project, index }: { project: StudioProject; index: number }) {
  const href = projectPath(project);
  const tags = project.capabilities.slice(0, 2);

  return (
    <article className="project-card">
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
          <ArrowRightIcon size={15} className="project-card-cta-arrow" />
        </span>
      </div>

      <Link href={href} className="project-card-stretch" aria-label={`Open ${project.name}`} />
    </article>
  );
}
