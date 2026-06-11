import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  /** Optional leading section number (01 / 02 …) rendered in mono. */
  number?: string;
};

/** Letterspaced mono kicker. The systematized label voice borrowed from Synk. */
export function Eyebrow({ children, className, number }: EyebrowProps) {
  return (
    <p className={["eyebrow", className].filter(Boolean).join(" ")}>
      {number ? <span className="eyebrow-number">{number}</span> : null}
      <span className="eyebrow-dot" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}
