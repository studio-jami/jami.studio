import type { ReactNode } from "react";
import { Eyebrow } from "./eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  /** Optional section number, e.g. "02", rendered alongside the eyebrow. */
  number?: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Heading level — pages keep one h1; sections use h2. */
  as?: "h1" | "h2";
  align?: "start" | "center";
  className?: string;
};

/**
 * Consistent section header: eyebrow (+ optional number) → display title → optional lead.
 * The Kirimo "Section Title" block — uppercase eyebrow over a large display heading.
 */
export function SectionHeading({
  eyebrow,
  number,
  title,
  lead,
  as: Tag = "h2",
  align = "start",
  className
}: SectionHeadingProps) {
  return (
    <div className={["section-heading", `align-${align}`, className].filter(Boolean).join(" ")}>
      {eyebrow ? <Eyebrow number={number}>{eyebrow}</Eyebrow> : null}
      <Tag className="section-title">{title}</Tag>
      {lead ? <p className="section-lead">{lead}</p> : null}
    </div>
  );
}
