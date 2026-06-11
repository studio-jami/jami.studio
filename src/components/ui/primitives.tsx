import type { ElementType, ReactNode } from "react";

/** Max-width container bound to the --container token. */
export function Container({
  children,
  className,
  as: Tag = "div"
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Tag className={["container", className ?? ""].filter(Boolean).join(" ")}>{children}</Tag>;
}

/** Vertical-rhythm section bound to the --section token, with a max-width container inside. */
export function Section({
  children,
  className,
  tight = false,
  id,
  "aria-label": ariaLabel,
  as: Tag = "section"
}: {
  children: ReactNode;
  className?: string;
  tight?: boolean;
  id?: string;
  "aria-label"?: string;
  as?: ElementType;
}) {
  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      className={["section", tight ? "section--tight" : "", className ?? ""]
        .filter(Boolean)
        .join(" ")}
    >
      <Container>{children}</Container>
    </Tag>
  );
}

/** Small-caps mono/accent eyebrow label. */
export function Eyebrow({
  children,
  plain = false
}: {
  children: ReactNode;
  plain?: boolean;
}) {
  return <span className={plain ? "eyebrow eyebrow--plain" : "eyebrow"}>{children}</span>;
}

/** Pill badge (capability tag, OSS marker, status). */
export function Badge({
  children,
  accent = false,
  dot = false
}: {
  children: ReactNode;
  accent?: boolean;
  dot?: boolean;
}) {
  return (
    <span className={accent ? "badge badge--accent" : "badge"}>
      {dot ? <span className="badge-dot" aria-hidden="true" /> : null}
      {children}
    </span>
  );
}

/** Consistent section heading: eyebrow + title + optional lead. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  center = false,
  headingId,
  as: Heading = "h2"
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
  headingId?: string;
  as?: ElementType;
}) {
  return (
    <div className={center ? "section-head section-head--center" : "section-head"}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <Heading id={headingId}>{title}</Heading>
      {lead ? <p>{lead}</p> : null}
    </div>
  );
}
