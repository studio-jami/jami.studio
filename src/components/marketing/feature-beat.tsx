import type { ReactNode } from "react";
import { Container } from "@/components/ui/layout";
import { GhostBadge } from "@/components/ui/primitives";

export type FeaturePoint = {
  title: string;
  body: string;
};

type FeatureBeatProps = {
  index: string;
  kicker: string;
  heading: ReactNode;
  body: string;
  points: FeaturePoint[];
  /** Which visual treatment renders on the panel side. */
  visual: ReactNode;
  flip?: boolean;
  labelledById: string;
};

/**
 * FeatureBeat — the signature progressive value cadence. One component, reused
 * three times via props (the template renders three sequential Features beats).
 * A Text column (GhostBadge + heading + body + value points) sits beside a
 * layered "screen" visual; `flip` alternates the rhythm.
 */
export function FeatureBeat({
  index,
  kicker,
  heading,
  body,
  points,
  visual,
  flip = false,
  labelledById
}: FeatureBeatProps) {
  return (
    <Container as="div" className="feature-beat" data-flip={flip}>
      <div className="feature-beat-text">
        <GhostBadge>
          <span className="section-num">{index}</span>
          {kicker}
        </GhostBadge>
        <h2 id={labelledById} className="display-2">
          {heading}
        </h2>
        <p className="prose">{body}</p>

        {points.length > 0 ? (
          <ul className="feature-beat-points">
            {points.map((point) => (
              <li className="feature-point" key={point.title}>
                <span className="feature-point-mark" aria-hidden="true" />
                <span>
                  <strong>{point.title}</strong>
                  <span>{point.body}</span>
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="feature-visual-wrap">{visual}</div>
    </Container>
  );
}
