import type { ReactNode } from "react";

/**
 * Synk's section title block: a tall centered band over a dot-matrix field
 * that parts around the copy — heading (maxWidth-capped) plus optional lead.
 * Every major section opens with one of these.
 */
export function SectionHeading({
  title,
  lead,
  headingId
}: {
  title: ReactNode;
  lead?: ReactNode;
  headingId?: string;
}) {
  return (
    <div className="dots-band" data-reveal>
      <h2 id={headingId}>{title}</h2>
      {lead ? <p className="lead">{lead}</p> : null}
    </div>
  );
}
