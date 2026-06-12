import type { ReactNode } from "react";

type EyebrowProps = {
  /** Optional leading section number rendered as a mono kicker (01 / 02 / 03). */
  index?: string;
  tone?: "accent" | "muted";
  children: ReactNode;
};

/**
 * Small-caps mono label — the Kirimo "Subtitle"/"Big Subtitle" treatment:
 * uppercase, positive tracking, optional numbered kicker for editorial structure.
 */
export function Eyebrow({ index, tone = "accent", children }: EyebrowProps) {
  return (
    <p className={`eyebrow eyebrow-${tone}`}>
      {index ? <span className="eyebrow-index">{index}</span> : null}
      <span>{children}</span>
    </p>
  );
}
