import Link from "next/link";
import { projects, type StudioProject } from "@/content/projects";
import { projectPath } from "@/lib/routes";

/** "Part of the Studio family" — cross-links to sibling projects on detail pages. */
export function FamilyLinks({ current }: { current: StudioProject }) {
  const siblings = projects.filter((project) => project.slug !== current.slug);

  return (
    <ul className="family-links">
      {siblings.map((project) => (
        <li key={project.slug}>
          <Link href={projectPath(project)} className="family-link">
            <span className="family-link-name">{project.name}</span>
            <span className="family-link-summary">{project.summary}</span>
            <span className="family-link-arrow" aria-hidden="true">
              ↗
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
