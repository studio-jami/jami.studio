import { Section } from "@/components/ui/primitives";
import { Reveal } from "@/components/system/reveal";

/**
 * Proof / capability band: a distilled statement beside a short list of earned proof points.
 * Reused on the homepage (the `site.home.proof` line) and on project detail pages
 * (`proofPoints[]`). Credibility, not logo soup.
 */
export function ProofBand({
  eyebrow = "How it holds together",
  statement,
  points
}: {
  eyebrow?: string;
  statement: string;
  points: string[];
}) {
  return (
    <Section aria-label="Proof points">
      <Reveal>
        <div className="proof">
          <div className="section-head">
            <span className="eyebrow">{eyebrow}</span>
            <p className="proof-statement">{statement}</p>
          </div>
          <ul className="proof-points">
            {points.map((point) => (
              <li className="proof-point" key={point}>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
