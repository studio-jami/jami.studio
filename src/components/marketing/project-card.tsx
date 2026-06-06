import Link from "next/link";
import Image from "next/image";
import type { StudioProject } from "@/content/projects";
import { projectPath } from "@/lib/routes";

export function ProjectCard({ project }: { project: StudioProject }) {
  return (
    <article className="project-card">
      <Image
        className="project-card-image"
        src={project.visualImage}
        alt={`${project.name} card`}
        width={900}
        height={560}
        loading="eager"
      />
      <div className="project-card-body">
        <p className="meta">{project.shortName}</p>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <ul className="project-card-list">
          {project.capabilities.slice(0, 2).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="project-card-footer">
        <span>{project.subdomain}</span>
        <Link href={projectPath(project)} className="text-link">
          Read brief
        </Link>
      </div>
    </article>
  );
}
