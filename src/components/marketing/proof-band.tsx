import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";

type ProofBandProps = {
  eyebrow: string;
  number?: string;
  title: string;
  /** Distilled proof points rendered as a checked list. */
  points: readonly string[];
  /** Optional supporting line under the title. */
  lead?: string;
};

/**
 * Earned-credibility band — a registry candidate (`ProofBand`). Used on home with the
 * `site.home.proof` framing and on project detail pages with `proofPoints[]`. Quiet panel,
 * accent markers; never logo soup or fabricated metrics.
 */
export function ProofBand({ eyebrow, number, title, points, lead }: ProofBandProps) {
  return (
    <Section className="proof-band" aria-label={title}>
      <div className="proof-inner">
        <div className="proof-head">
          <Eyebrow number={number}>{eyebrow}</Eyebrow>
          <h2 className="proof-title">{title}</h2>
          {lead ? <p className="proof-lead">{lead}</p> : null}
        </div>
        <ul className="proof-list">
          {points.map((point) => (
            <li key={point} className="proof-item">
              <span className="proof-marker" aria-hidden="true" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
