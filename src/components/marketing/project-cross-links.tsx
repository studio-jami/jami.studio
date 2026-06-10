import Link from "next/link";
import { projects, type StudioProject } from "@/content/projects";
import { projectPath } from "@/lib/routes";

/** "Part of the Studio family" — links to the four sibling projects. */
export function ProjectCrossLinks({ current }: { current: StudioProject }) {
  const siblings = projects.filter((project) => project.slug !== current.slug);

  return (
    <ul className="cross-links">
      {siblings.map((project) => (
        <li key={project.slug}>
          <Link href={projectPath(project)} className="cross-link">
            <span className="cross-link__name">{project.name}</span>
            <span className="cross-link__summary">{project.summary}</span>
            <span className="cross-link__arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
