import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  /** Optional mono section number rendered before the label (e.g. "02"). */
  index?: string;
  className?: string;
};

/** Mono, small-caps label. The editorial kicker used above every section head. */
export function Eyebrow({ children, index, className }: EyebrowProps) {
  return (
    <p className={["eyebrow", className].filter(Boolean).join(" ")}>
      {index ? <span className="eyebrow-index">{index}</span> : null}
      <span className="eyebrow-label">{children}</span>
    </p>
  );
}
