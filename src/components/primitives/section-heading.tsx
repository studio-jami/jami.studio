import type { ElementType, ReactNode } from "react";
import { Eyebrow } from "@/components/primitives/eyebrow";

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  index?: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Heading level for correct document outline (h1 on hero pages, else h2). */
  as?: ElementType;
  id?: string;
  align?: "start" | "center";
  className?: string;
  actions?: ReactNode;
};

/** Consistent eyebrow + heading + lead block used by every section. */
export function SectionHeading({
  eyebrow,
  index,
  title,
  lead,
  as: Heading = "h2",
  id,
  align = "start",
  className,
  actions
}: SectionHeadingProps) {
  return (
    <div
      className={["section-heading", `section-heading--${align}`, className]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow ? <Eyebrow index={index}>{eyebrow}</Eyebrow> : null}
      <Heading id={id} className="section-title">
        {title}
      </Heading>
      {lead ? <p className="section-lead">{lead}</p> : null}
      {actions ? <div className="section-actions">{actions}</div> : null}
    </div>
  );
}
