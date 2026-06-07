import Link from "next/link";
import type { StudioProject } from "@/content/projects";
import { projectPath } from "@/lib/routes";

export function SignalForgeProjectCard({ project }: { project: StudioProject }) {
  return (
    <article className="forge-project-card">
      <div className="forge-project-card-accent" aria-hidden="true" />
      <div className="forge-project-card-body">
        <p className="meta">{project.subdomain}</p>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <ul className="forge-capability-tags" aria-label={`${project.shortName} capabilities`}>
          {project.capabilities.slice(0, 2).map((capability) => (
            <li key={capability}>{capability}</li>
          ))}
        </ul>
      </div>
      <Link href={projectPath(project)} className="text-link forge-card-link">
        Explore {project.shortName}
      </Link>
    </article>
  );
}