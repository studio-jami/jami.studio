import { site } from "@/content/site";

/**
 * The Kirimo "Our Client" slot — but honest. No fabricated logo wall; instead the
 * studio's real credibility line (everything generated from shared source data),
 * presented as a quiet marquee-style band of the source disciplines.
 */
const DISCIPLINES = [
  "Shared source data",
  "Generated routes",
  "Canonical metadata",
  "AI-readable files",
  "Stable URLs",
  "Token-driven UI"
] as const;

export function ProofLine() {
  return (
    <div className="proof-line">
      <p className="proof-line-label">Built from one source</p>
      <p className="proof-line-statement">{site.home.proof}</p>
      <ul className="proof-line-strip" aria-hidden="true">
        {[...DISCIPLINES, ...DISCIPLINES].map((item, index) => (
          <li key={`${item}-${index}`}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
