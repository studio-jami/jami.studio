import type { ElementType, ReactNode } from "react";

/**
 * Small-caps uppercase eyebrow / tag — the dotted kicker that opens every Nouva section
 * (the "Eyebrow" component in the template). The leading accent dot is drawn in CSS.
 */
export function Eyebrow({ children, as: Tag = "p" }: { children: ReactNode; as?: ElementType }) {
  return <Tag className="eyebrow">{children}</Tag>;
}

type SectionHeadingProps = {
  eyebrow?: ReactNode;
  title: ReactNode;
  titleId?: string;
  lead?: ReactNode;
  as?: "h1" | "h2";
  align?: "start" | "center";
  className?: string;
};

/**
 * The lane's consistent section opener: an uppercase eyebrow tag followed by a big Onest
 * title with tight (-0.04em) tracking, and an optional lead paragraph. This is the
 * repeated "eyebrow → H2" unit seen on every Nouva section.
 */
export function SectionHeading({
  eyebrow,
  title,
  titleId,
  lead,
  as: Tag = "h2",
  align = "start",
  className
}: SectionHeadingProps) {
  return (
    <div
      className={["section-heading", `section-heading--${align}`, className]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Tag id={titleId} className="section-title">
        {title}
      </Tag>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
}
