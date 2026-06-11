import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Reusable proof band. Earned credibility, not logo soup: a short statement on the left, a list of
 * concrete proof points on the right. Used on the home page (site.home.proof) and on project detail
 * pages (project.proofPoints).
 */
export function ProofBand({
  eyebrow,
  title,
  points,
  lead
}: {
  eyebrow: string;
  title: string;
  points: string[];
  lead?: string;
}) {
  return (
    <div className="proof-band">
      <div className="stack" style={{ gap: "1rem" }}>
        <Eyebrow accent>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
        {lead ? (
          <p className="measure" style={{ color: "var(--muted-foreground)" }}>
            {lead}
          </p>
        ) : null}
      </div>
      <ul className="proof-points">
        {points.map((point) => (
          <li className="proof-point" key={point}>
            <span className="proof-point-marker" aria-hidden="true" />
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
