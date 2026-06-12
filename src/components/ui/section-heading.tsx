import type { ReactNode } from "react";
import { Eyebrow } from "./eyebrow";

type SectionHeadingProps = {
  index?: string;
  eyebrow: string;
  title: ReactNode;
  /** Optional lead/description column rendered beside the title on wide layouts. */
  lead?: ReactNode;
  align?: "split" | "stacked";
  titleId?: string;
  as?: "h2" | "h3";
};

/**
 * The Kirimo "Section Title" block: a numbered mono eyebrow, an oversized heading,
 * and an optional description that sits to the side on desktop (split) or below
 * (stacked). One consistent heading rhythm across every band.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  align = "split",
  titleId,
  as: Tag = "h2"
}: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading-${align}`}>
      <div className="section-heading-main">
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
        <Tag id={titleId} className="section-title">
          {title}
        </Tag>
      </div>
      {lead ? <div className="section-heading-lead">{lead}</div> : null}
    </div>
  );
}
