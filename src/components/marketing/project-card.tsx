import Link from "next/link";
import type { StudioProject } from "@/content/projects";

export function ProjectCard({ project }: { project: StudioProject }) {
  return (
    <article className="project-card">
      <div>
        <p className="meta">{project.subdomain}</p>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
      </div>
      <Link href={project.route} className="text-link">
        Open project
      </Link>
    </article>
  );
}
