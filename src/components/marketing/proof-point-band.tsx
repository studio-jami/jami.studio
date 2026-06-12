import { Container } from "@/components/ui/layout";
import { GhostBadge } from "@/components/ui/primitives";
import type { StudioProject } from "@/content/projects";

/**
 * ProofPointBand — replaces the template's Testimonials slot. We have no quotes
 * and never invent them; instead this distils one real `proofPoint` from each
 * product into an earned-credibility band, attributed to the project it comes
 * from. Honest proof, not fabricated social proof.
 */
export function ProofPointBand({
  projects,
  id
}: {
  projects: readonly StudioProject[];
  id: string;
}) {
  const points = projects.map((project) => ({
    shortName: project.shortName,
    point: project.proofPoints[0]
  }));

  return (
    <Container as="div" className="proof-band">
      <div className="proof-band-lede">
        <GhostBadge>Earned, not claimed</GhostBadge>
        <h2 id={id} className="display-2">
          Credibility from how the system is built
        </h2>
        <p className="prose">
          No logo walls, no invented testimonials. Each product earns trust through a single
          design decision you can verify in its own repository.
        </p>
      </div>

      <ul className="proof-band-list">
        {points.map((entry) => (
          <li className="proof-point" key={entry.shortName}>
            <span className="proof-point-mark" aria-hidden="true">
              ✓
            </span>
            <span>
              {entry.point}
              <small>{entry.shortName}</small>
            </span>
          </li>
        ))}
      </ul>
    </Container>
  );
}
