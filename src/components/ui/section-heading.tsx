import type { ReactNode } from "react";

type SectionHeadingProps = {
  /** Editorial index marker, e.g. "01". */
  number?: string;
  /** Mono kicker rendered beside the index marker. */
  kicker: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Heading level for document outline correctness. */
  as?: "h1" | "h2";
  align?: "start" | "center";
  className?: string;
};

/**
 * The canonical section opener: hairline rule, mono index + kicker,
 * display-serif title, optional lead.
 */
export function SectionHeading({
  number,
  kicker,
  title,
  lead,
  as: Heading = "h2",
  align = "start",
  className
}: SectionHeadingProps) {
  const classes = ["section-head"];
  if (align === "center") classes.push("section-head--center");
  if (className) classes.push(className);

  return (
    <header className={classes.join(" ")}>
      <p className="section-mark">
        {number ? <span className="section-no">{number}</span> : null}
        <span className="section-kicker">{kicker}</span>
      </p>
      <Heading className="section-title">{title}</Heading>
      {lead ? <p className="section-lead">{lead}</p> : null}
    </header>
  );
}

/** Two-digit editorial index formatter shared by every numbered surface. */
export function formatIndex(position: number): string {
  return String(position).padStart(2, "0");
}
