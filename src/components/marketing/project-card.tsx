import Link from "next/link";
import type { StudioProject } from "@/content/projects";
import { projectPath } from "@/lib/routes";

export type ProjectCardHeadingLevel = "h2" | "h3";

export function ProjectCard({
  project,
  headingLevel = "h3"
}: {
  project: StudioProject;
  // Card headings must continue the surrounding document outline: h3 under a
  // section h2 (home), h2 directly under the page h1 (projects index).
  headingLevel?: ProjectCardHeadingLevel;
}) {
  const Heading = headingLevel;

  return (
    <article className="project-card card">
      <div>
        <p className="meta">{project.shortName}</p>
        <Heading>{project.name}</Heading>
        <p>{project.summary}</p>
      </div>
      <ul className="proof card-proof">
        {project.proofPoints.slice(0, 2).map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <Link href={projectPath(project)} className="text-link">
        Explore {project.shortName} →
      </Link>
    </article>
  );
}
