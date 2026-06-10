import type { ReactNode } from "react";

type EyebrowProps = {
  index?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Mono small-caps label, optionally prefixed with an editorial section number
 * (01 / 02 / 03 …). Used for eyebrows, kickers, and capability tags.
 */
export function Eyebrow({ index, children, className }: EyebrowProps) {
  return (
    <p className={`eyebrow${className ? ` ${className}` : ""}`}>
      {index ? (
        <span className="eyebrow__index" aria-hidden="true">
          {index}
        </span>
      ) : null}
      <span className="eyebrow__label">{children}</span>
    </p>
  );
}
