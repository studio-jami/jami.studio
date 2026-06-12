import type { ReactNode } from "react";

/**
 * The Synk section "Title" block: index + eyebrow kicker, heading, and an
 * optional lead. Centered by default (Synk centers section titles); pass
 * `align="start"` for left-aligned editorial heads.
 */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  align = "center",
  headingId
}: {
  index?: string;
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "center" | "start";
  headingId?: string;
}) {
  return (
    <div className={["section-head", align === "center" ? "is-centered" : ""].filter(Boolean).join(" ")}>
      {(index || eyebrow) && (
        <span className="eyebrow is-plain">
          {index ? <span className="section-index">{index}</span> : null}
          {eyebrow}
        </span>
      )}
      <h2 id={headingId}>{title}</h2>
      {lead ? <p className="lead">{lead}</p> : null}
    </div>
  );
}
