import Link from "next/link";
import type { StudioProject } from "@/content/projects";
import { projectPath } from "@/lib/routes";
import { ProjectIcon } from "./project-icons";

export function LuminousProjectCard({ project }: { project: StudioProject }) {
  return (
    <article className="lg-project-card">
      <div className="lg-project-card-icon">
        <ProjectIcon slug={project.slug} />
      </div>
      <div className="lg-project-card-body">
        <p className="lg-meta">{project.subdomain}</p>
        <h3>{project.name}</h3>
        <p className="lg-project-card-summary">{project.summary}</p>
      </div>
      <Link href={projectPath(project)} className="lg-text-link">
        Explore {project.shortName}
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" width="14" height="14">
          <path
            d="M3 8h10M9 4l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    </article>
  );
}