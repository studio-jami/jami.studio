import { SectionHeading } from "@/components/ui/section-heading";
import { projects } from "@/content/projects";

/**
 * The Kirimo "Testimonials" slot — but honest. No invented quotes; instead a
 * distilled band of the family's real proof posture, one earned proof point per
 * project, attributed to the product rather than a fictional person.
 */
export function ProofPointBand() {
  const points = projects.map((project) => ({
    name: project.shortName,
    point: project.proofPoints[0]
  }));

  return (
    <div className="proof-band">
      <SectionHeading
        index="06"
        eyebrow="Why the boundaries hold"
        titleId="proof-title"
        title="Earned credibility, not borrowed logos."
        lead={
          <p>
            Each product is held to one principle. These are the design commitments the family is
            built around — drawn straight from the project records.
          </p>
        }
      />

      <ul className="proof-band-list">
        {points.map((entry) => (
          <li key={entry.name} className="proof-band-item">
            <p className="proof-band-quote">{entry.point}</p>
            <p className="proof-band-source">— {entry.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
