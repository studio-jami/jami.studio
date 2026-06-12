import type { ElementType, ReactNode } from "react";

/** Oversized editorial section number (01 / 02 / 03 …) in the mono face. */
export function SectionNumber({ value }: { value: string }) {
  return (
    <span className="section-number" aria-hidden="true">
      {value}
    </span>
  );
}

/** Small-caps mono eyebrow / kicker label. */
export function Eyebrow({ children, as: Tag = "p" }: { children: ReactNode; as?: ElementType }) {
  return <Tag className="eyebrow">{children}</Tag>;
}

type SectionHeadingProps = {
  number?: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  titleId?: string;
  lead?: ReactNode;
  as?: "h1" | "h2";
  align?: "start" | "center";
  className?: string;
};

/**
 * The lane's consistent section header: optional oversized number, mono eyebrow,
 * a display title with tight tracking, and an optional lead paragraph. This is the
 * repeated "Headline" unit seen on every Nouva section.
 */
export function SectionHeading({
  number,
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
      {(number || eyebrow) && (
        <div className="section-heading-top">
          {number && <SectionNumber value={number} />}
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        </div>
      )}
      <Tag id={titleId} className="section-title">
        {title}
      </Tag>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
  );
}
