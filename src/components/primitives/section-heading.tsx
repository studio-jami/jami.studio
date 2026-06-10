import type { ReactNode } from "react";
import { Eyebrow } from "./eyebrow";

type SectionHeadingProps = {
  index?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "start" | "center";
  className?: string;
  id?: string;
};

/**
 * Consistent eyebrow + heading + optional lead block. The single source of
 * heading rhythm across every section so hierarchy never drifts.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  as: Tag = "h2",
  align = "start",
  className,
  id
}: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align}${className ? ` ${className}` : ""}`}>
      {eyebrow ? <Eyebrow index={index}>{eyebrow}</Eyebrow> : null}
      <Tag id={id} className="section-heading__title">
        {title}
      </Tag>
      {lead ? <p className="section-heading__lead">{lead}</p> : null}
    </div>
  );
}
