import type { ReactNode } from "react";
import { Eyebrow } from "./eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  number?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "start" | "center";
  as?: "h1" | "h2";
  className?: string;
};

/**
 * Consistent section header: numbered mono eyebrow + heading + optional lead.
 * One composition reused on every section so headings never drift.
 */
export function SectionHeading({
  eyebrow,
  number,
  title,
  lead,
  align = "start",
  as: Heading = "h2",
  className
}: SectionHeadingProps) {
  return (
    <div
      className={["section-heading", `section-heading-${align}`, className]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow ? <Eyebrow number={number}>{eyebrow}</Eyebrow> : null}
      <Heading className="section-title">{title}</Heading>
      {lead ? <p className="section-lead">{lead}</p> : null}
    </div>
  );
}
