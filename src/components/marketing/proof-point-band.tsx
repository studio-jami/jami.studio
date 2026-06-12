import { projects } from "@/content/projects";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/system/section-heading";

/**
 * Feedback Section → a proof-point band, NOT testimonials. There are no quotes, faces, or
 * invented reviews. Instead the studio's own architectural commitments — the first proof
 * point from each real product — stand as the "feedback": earned, verifiable positioning.
 */
export function ProofPointBand() {
  const proofs = projects.map((project) => ({
    label: project.shortName,
    point: project.proofPoints[0]
  }));

  return (
    <Section className="proof-section" ariaLabelledby="proof-heading">
      <Container>
        <SectionHeading
          index="04"
          eyebrow="The position we hold"
          id="proof-heading"
          title="Boundaries we keep, in our own words."
          lead="No testimonials — the studio is judged on how cleanly its surfaces stay separated. One commitment from each product."
        />

        <ul className="proof-list">
          {proofs.map((proof) => (
            <li className="proof-item" key={proof.label}>
              <span className="proof-item-label">{proof.label}</span>
              <p className="proof-item-text">{proof.point}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
