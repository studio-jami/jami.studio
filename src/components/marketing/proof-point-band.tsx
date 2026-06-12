import type { StudioProject } from "@/content/projects";

/**
 * Kirimo's testimonial treatment — giant terra-cotta quote marks, oversized
 * sand quote text, attribution line — filled honestly with distilled REAL
 * `proofPoints[]` from the project records. The first commitment leads at full
 * strength; the rest sit dimmed beneath, exactly like the template's stacked
 * quotes. No invented names, roles, or avatars.
 */
export function ProofPointBand({ projects }: { projects: StudioProject[] }) {
  const commitments = projects
    .slice(0, 3)
    .map((project) => ({ project, point: project.proofPoints[0] }));

  return (
    <div className="quotes">
      {commitments.map(({ project, point }, index) => (
        <figure key={project.slug} className={index === 0 ? "quote quote--lead" : "quote"}>
          <span className="quote__mark" aria-hidden="true">
            &ldquo;
          </span>
          <blockquote className="quote__text">{point}.</blockquote>
          <figcaption className="quote__source">
            <strong>{project.name}</strong>
            <span>Design commitment</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
