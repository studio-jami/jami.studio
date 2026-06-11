import type { ReactNode } from "react";

/** Mono small-caps kicker. Borrowed from Nouva's "Tag" / "Eyebrow" vocabulary. */
export function Eyebrow({
  children,
  accent = false,
  bare = false,
  className
}: {
  children: ReactNode;
  accent?: boolean;
  bare?: boolean;
  className?: string;
}) {
  const classes = [
    "eyebrow",
    accent ? "eyebrow--accent" : "",
    bare ? "eyebrow--bare" : "",
    className
  ]
    .filter(Boolean)
    .join(" ");
  return <span className={classes}>{children}</span>;
}
