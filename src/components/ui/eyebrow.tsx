import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  /** Optional leading section number, e.g. "01". Rendered in the mono/accent style. */
  number?: string;
  className?: string;
  as?: "p" | "span" | "div";
};

/**
 * Small-caps mono label — the Kirimo "Subtitle"/eyebrow signature. Uppercase, tracked,
 * accent-colored. Used for section kickers, capability tags, and the `01/02/03` markers.
 */
export function Eyebrow({ children, number, className, as: Tag = "p" }: EyebrowProps) {
  return (
    <Tag className={["eyebrow", className].filter(Boolean).join(" ")}>
      {number ? <span className="eyebrow-number">{number}</span> : null}
      <span className="eyebrow-text">{children}</span>
    </Tag>
  );
}
