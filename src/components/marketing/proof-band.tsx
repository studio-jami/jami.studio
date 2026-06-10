import type { ReactNode } from "react";

type ProofBandProps = {
  points: string[];
  caption?: ReactNode;
  numbered?: boolean;
};

/**
 * Earned-credibility band: a tight list of proof points rendered as an
 * editorial numbered/hairline list rather than a logo wall.
 */
export function ProofBand({ points, caption, numbered = true }: ProofBandProps) {
  return (
    <div className="proof">
      <ul className="proof__list">
        {points.map((point, index) => (
          <li key={point} className="proof__item">
            {numbered ? (
              <span className="proof__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            ) : (
              <span className="proof__bullet" aria-hidden="true" />
            )}
            <span className="proof__text">{point}</span>
          </li>
        ))}
      </ul>
      {caption ? <p className="proof__caption">{caption}</p> : null}
    </div>
  );
}
