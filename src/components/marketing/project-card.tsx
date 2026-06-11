import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "@/components/ui/icons";
import type { StudioProject } from "@/content/projects";
import { projectPath } from "@/lib/routes";

const statusLabel: Record<StudioProject["internalStatus"], string> = {
  live: "Live",
  foundation: "Foundation",
  planned: "In design"
};

/**
 * The portfolio unit — one Studio product. Name, summary, positioning hook, a short capability tease,
 * and a full-card link into the detail page. Looks intentional in a grid and standalone.
 */
export function ProjectCard({ project, index }: { project: StudioProject; index?: number }) {
  const number = typeof index === "number" ? String(index + 1).padStart(2, "0") : null;

  return (
    <article className="project-card">
      <div className="project-card-top">
        <Badge dot accent={project.internalStatus === "live"}>
          {statusLabel[project.internalStatus]}
        </Badge>
        {number ? <span className="project-card-index">{number}</span> : null}
      </div>

      <div className="stack" style={{ gap: "0.6rem" }}>
        <h3>{project.name}</h3>
        <p className="project-card-summary">{project.summary}</p>
      </div>

      <p className="project-card-positioning">{project.positioning}</p>

      <div className="project-card-tags">
        {project.capabilities.slice(0, 3).map((capability) => (
          <Badge key={capability}>{capability.split(" ").slice(0, 3).join(" ")}</Badge>
        ))}
      </div>

      <span className="project-card-link">
        Open project <ArrowUpRight />
      </span>

      <Link
        href={projectPath(project)}
        className="project-card-cover"
        aria-label={`Open ${project.name}`}
      />
    </article>
  );
}
