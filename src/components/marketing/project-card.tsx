import Link from "next/link";
import type { StudioProject } from "@/content/projects";
import { projectPath } from "@/lib/routes";

export function ProjectCard({ project }: { project: StudioProject }) {
  return (
    <article className="project-card">
      <div>
        <p className="meta">{project.subdomain}</p>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
      </div>
      <Link href={projectPath(project)} className="text-link">
        Open project
      </Link>
    </article>
  );
}
