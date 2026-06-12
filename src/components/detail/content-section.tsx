import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";

type ContentSectionProps = {
  index?: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
  titleId?: string;
};

/**
 * "Content Section" — the Kirimo detail narrative block: a numbered mono eyebrow,
 * a heading, and a prose body. Used for positioning / audience / agent-shape
 * statements on the project detail page.
 */
export function ContentSection({ index, eyebrow, title, titleId, children }: ContentSectionProps) {
  return (
    <section className="content-section" aria-labelledby={titleId}>
      <div className="content-section-head">
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
        <h2 id={titleId} className="content-section-title">
          {title}
        </h2>
      </div>
      <div className="content-section-body">{children}</div>
    </section>
  );
}
