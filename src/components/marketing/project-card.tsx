import { TextLink } from "@/components/ui/button";
import { Badge } from "@/components/ui/primitives";
import type { StudioProject } from "@/content/projects";

/**
 * One Studio product as a portfolio unit: short name, title, summary, positioning hook,
 * a capability tease, and a resolved CTA into the detail route. Used in the home showcase
 * and the /projects index — looks intentional both in a grid and standalone.
 *
 * Implementation status (`internalStatus`) is deliberately NOT surfaced here: per AGENTS.md
 * and reference-brief §14, current build status stays out of first-impression marketing copy.
 */
export function ProjectCard({
  project,
  capabilityCount = 2
}: {
  project: StudioProject;
  capabilityCount?: number;
}) {
  return (
    <article className="project-card">
      <div className="project-card-top">
        <span className="project-card-name">{project.shortName}</span>
        <span className="project-card-mark" aria-hidden="true" />
      </div>

      <div>
        <h3>{project.name}</h3>
      </div>

      <p className="project-card-summary">{project.summary}</p>
      <p className="project-card-positioning">{project.positioning}</p>

      <div className="project-card-tags">
        {project.capabilities.slice(0, capabilityCount).map((capability) => (
          <Badge key={capability}>{capability}</Badge>
        ))}
      </div>

      <div className="project-card-foot">
        <TextLink href={project.route}>Explore {project.shortName}</TextLink>
      </div>
    </article>
  );
}
