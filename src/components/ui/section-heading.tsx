import type { ReactNode } from "react";

/**
 * Consistent eyebrow + heading + optional kicker block, with an optional 01/02/03 section number.
 * `as` controls the heading level so pages keep an ordered, single-h1 hierarchy.
 */
export function SectionHeading({
  eyebrow,
  number,
  title,
  kicker,
  as: Heading = "h2",
  center = false,
  id
}: {
  eyebrow?: string;
  number?: string;
  title: ReactNode;
  kicker?: ReactNode;
  as?: "h1" | "h2" | "h3";
  center?: boolean;
  id?: string;
}) {
  return (
    <div className={["section-head", center ? "section-head--center" : ""].filter(Boolean).join(" ")}>
      {(eyebrow || number) && (
        <p className={number ? "eyebrow eyebrow--bare" : "eyebrow"}>
          {number ? <span className="section-number">{number}</span> : null}
          {eyebrow ? <span>{eyebrow}</span> : null}
        </p>
      )}
      <Heading id={id}>{title}</Heading>
      {kicker ? <p>{kicker}</p> : null}
    </div>
  );
}
