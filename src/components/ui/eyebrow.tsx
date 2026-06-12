import type { ReactNode } from "react";

/**
 * Mono small-caps kicker used above section headings. Optional leading marker
 * (the Synk "Tag" treatment); `plain` drops the marker for inline use.
 */
export function Eyebrow({
  children,
  plain,
  className
}: {
  children: ReactNode;
  plain?: boolean;
  className?: string;
}) {
  return (
    <span className={["eyebrow", plain ? "is-plain" : "", className].filter(Boolean).join(" ")}>
      {children}
    </span>
  );
}
