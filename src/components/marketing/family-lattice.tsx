import Link from "next/link";
import { FamilyGlyph } from "@/components/system/pixel-icons";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

/**
 * Synk's integrations grid, honestly substituted: a 3-column dashed tile
 * lattice of the REAL family — the five products (linked through the
 * content/route layer) plus the four shared foundations — never fake
 * third-party logos. Tile anatomy mirrors the template: icon chip + name
 * pill header, then a short description.
 */

const FOUNDATION_GLYPHS = ["harness", "registry", "orchestra", "intercal"];

export function FamilyLattice() {
  return (
    <div className="lattice cols-3">
      {projects.map((project) => (
        <Link key={project.slug} href={project.route} className="family-tile">
          <span className="family-tile-head">
            <span className="family-glyph" aria-hidden="true">
              <FamilyGlyph kind={project.slug} />
            </span>
            <span className="name-pill">{project.shortName}</span>
          </span>
          <p>{project.summary}</p>
          <span className="tile-link" aria-hidden="true">
            Explore {project.shortName} →
          </span>
        </Link>
      ))}

      {site.home.pillars.map((pillar, index) => (
        <article key={pillar.title} className="family-tile">
          <span className="family-tile-head">
            <span className="family-glyph" aria-hidden="true">
              <FamilyGlyph kind={FOUNDATION_GLYPHS[index] ?? "source"} />
            </span>
            <span className="name-pill">{pillar.title}</span>
          </span>
          <p>{pillar.body}</p>
        </article>
      ))}
    </div>
  );
}
