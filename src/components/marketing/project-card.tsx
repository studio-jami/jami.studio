import Link from "next/link";
import { FamilyGlyph } from "@/components/system/pixel-icons";
import { Badge } from "@/components/ui/badge";
import type { StudioProject } from "@/content/projects";

/**
 * The portfolio unit: one Studio product as a dashed-lattice cell — glyph +
 * name-pill header (the Synk tile anatomy), name, summary, and a quiet
 * explore cue. The whole card links to /projects/[slug].
 */
export function ProjectCard({ project }: { project: StudioProject }) {
  return (
    <Link href={project.route} className="project-card" aria-label={`Open ${project.name}`}>
      <div className="project-card-head">
        <span className="family-tile-head">
          <span className="family-glyph" aria-hidden="true">
            <FamilyGlyph kind={project.slug} />
          </span>
          <span className="name-pill">{project.shortName}</span>
        </span>
        <Badge dot={project.internalStatus === "live"}>{project.subdomain}</Badge>
      </div>
      <h3>{project.name}</h3>
      <p className="project-summary">{project.summary}</p>
      <p className="project-positioning">{project.positioning}</p>
      <div className="project-card-links">
        <span className="tile-link" aria-hidden="true">
          Explore {project.shortName} →
        </span>
      </div>
    </Link>
  );
}
