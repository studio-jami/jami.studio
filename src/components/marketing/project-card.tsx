import Link from "next/link";
import type { StudioProject } from "@/content/projects";

type ProjectCardProps = {
  project: StudioProject;
  variant?: "full" | "compact";
  headingLevel?: "h2" | "h3";
};

export function ProjectCard({ project, variant = "full", headingLevel = "h3" }: ProjectCardProps) {
  const Heading = headingLevel;

  return (
    <Link href={project.route} className="project-card">
      <span className="eyebrow">{project.shortName}</span>
      <Heading>{project.name}</Heading>
      {variant === "full" ? (
        <>
          <p className="summary">{project.summary}</p>
          <div className="positioning">{project.positioning}</div>
        </>
      ) : (
        <div className="positioning">View project</div>
      )}
    </Link>
  );
}
