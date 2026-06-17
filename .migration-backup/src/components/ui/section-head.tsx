import type { ReactNode } from "react";
import { Eyebrow } from "./eyebrow";

/**
 * Template `Section Title` block: terra-cotta uppercase eyebrow over a large
 * sand heading, optionally followed by a lead paragraph. Left-aligned,
 * constrained to the editorial measure (~55%) unless `wide`.
 */
export function SectionHead({
  eyebrow,
  title,
  titleId,
  lead,
  wide = false,
  level = 2
}: {
  eyebrow: string;
  title: ReactNode;
  titleId?: string;
  lead?: ReactNode;
  wide?: boolean;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <div className={wide ? "section-head section-head--wide" : "section-head"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <Heading id={titleId} className="section-head__title">
        {title}
      </Heading>
      {lead ? <p className="section-head__lead">{lead}</p> : null}
    </div>
  );
}
