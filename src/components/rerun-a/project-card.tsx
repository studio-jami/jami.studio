import Link from "next/link";
import type { StudioProject } from "@/content/projects";
import { projectPath } from "@/lib/routes";
import { ProjectIllustration } from "./svg/project-illustrations";

export function AtlasProjectCard({ project }: { project: StudioProject }) {
  return (
    <article className="atlas-project-card">
      <div className="atlas-project-card-art">
        <ProjectIllustration slug={project.slug} className="atlas-project-illustration" />
      </div>
      <div className="atlas-project-card-body">
        <p className="atlas-eyebrow">{project.subdomain}</p>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <Link href={projectPath(project)} className="atlas-text-link">
          Explore {project.shortName}
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}