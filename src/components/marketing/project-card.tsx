import Link from "next/link";
import Image from "next/image";
import type { StudioProject } from "@/content/projects";
import { projectPath } from "@/lib/routes";

export function ProjectCard({ project }: { project: StudioProject }) {
  return (
    <article className="project-card">
      <div className="project-card-media" aria-hidden="true">
        <Image src={project.socialImage} alt="" width={1200} height={630} />
      </div>
      <div className="project-card-copy">
        <p className="meta">{project.subdomain}</p>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
      </div>
      <div className="project-card-footer">
        <span>{project.shortName}</span>
        <Link href={projectPath(project)} className="text-link">
          Open project
        </Link>
      </div>
    </article>
  );
}
