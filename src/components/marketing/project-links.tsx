import type { StudioProject } from "@/content/projects";
import { projectLinkTargets } from "@/lib/routes";

/**
 * Public link map for a project, sourced from the route helpers (never
 * hand-assembled). Renders the resolved subdomain / repo / docs / API targets.
 */
export function ProjectLinks({ project }: { project: StudioProject }) {
  const targets = projectLinkTargets(project);

  return (
    <aside className="project-links" aria-label={`${project.name} public links`}>
      <p className="project-links-title">Public targets</p>
      <ul>
        {targets.map((target) => {
          const href = target.href ?? "#";
          const isInternal = href.startsWith("/");
          return (
            <li key={target.label}>
              <a
                href={href}
                className="project-link-row"
                {...(isInternal ? {} : { rel: "noreferrer noopener" })}
              >
                <span className="project-link-label">{target.label}</span>
                <span className="project-link-value">{target.value}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
