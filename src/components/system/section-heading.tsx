import type { ReactNode } from "react";

/** The numbered editorial spine marker (01 / 02 / 03 …) — Noir's signature. */
export function SectionNumber({ value }: { value: string }) {
  return (
    <span className="section-number" aria-hidden="true">
      {value}
    </span>
  );
}

type SectionHeadingProps = {
  /** Two-digit section index, e.g. "01". Drives the numbered spine. */
  index?: string;
  eyebrow: string;
  title: ReactNode;
  /** Heading level — keep one h1 per page; sections use h2. */
  as?: "h1" | "h2";
  id?: string;
  lead?: ReactNode;
  align?: "start" | "between";
  children?: ReactNode;
};

/**
 * Consistent section header: numbered marker + mono eyebrow + oversized display title,
 * with an optional lead and trailing slot (e.g. a CTA aligned to the far edge).
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  as: Heading = "h2",
  id,
  lead,
  align = "start",
  children
}: SectionHeadingProps) {
  return (
    <div className={`section-heading section-heading--${align}`}>
      <div className="section-heading-lead">
        <p className="eyebrow">
          {index ? <SectionNumber value={index} /> : null}
          <span>{eyebrow}</span>
        </p>
        <Heading id={id} className="display-heading">
          {title}
        </Heading>
        {lead ? <p className="section-heading-copy">{lead}</p> : null}
      </div>
      {children ? <div className="section-heading-aside">{children}</div> : null}
    </div>
  );
}
