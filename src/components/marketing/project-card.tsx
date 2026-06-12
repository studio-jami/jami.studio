import Link from "next/link";
import { Badge, Tag } from "@/components/ui/badge";
import type { StudioProject } from "@/content/projects";

/**
 * The portfolio unit. One Studio product as a hairline-framed cell: short name
 * badge, name, summary, a positioning hook, capability tags, and an arrow into
 * the detail route. The whole card links to /projects/[slug]. `lead` lets the
 * home showcase feature the live family member full-width.
 */
export function ProjectCard({ project, lead }: { project: StudioProject; lead?: boolean }) {
  return (
    <Link
      href={project.route}
      className={["project-card", lead ? "is-lead" : ""].filter(Boolean).join(" ")}
      aria-label={`Open ${project.name}`}
    >
      <div className="card-top">
        <Badge dot={project.internalStatus === "live"}>{project.shortName}</Badge>
        <span className="card-arrow" aria-hidden="true">
          ↗
        </span>
      </div>
      <h3>{project.name}</h3>
      <p className="card-summary">{project.summary}</p>
      {lead ? <p className="card-positioning">{project.positioning}</p> : null}
      <div className="card-foot">
        <div className="card-tags">
          <Tag>OSS</Tag>
          <Tag>{project.subdomain}</Tag>
        </div>
      </div>
    </Link>
  );
}
