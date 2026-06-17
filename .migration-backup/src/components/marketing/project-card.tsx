import Link from "next/link";
import type { StudioProject } from "@/content/projects";
import { projectPath } from "@/lib/routes";

export function ProjectCard({ project }: { project: StudioProject }) {
  return (
    <article className="project-card">
      <div>
        <p className="meta">{project.shortName}</p>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
      </div>
      <ul className="card-proof">
        {project.proofPoints.slice(0, 2).map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <Link href={projectPath(project)} className="text-link">
        Open project
      </Link>
    </article>
  );
}
