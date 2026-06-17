import type { ReactNode } from "react";
import { Divider } from "@/components/ui/divider";
import { Eyebrow } from "@/components/ui/eyebrow";

/**
 * Kirimo "Content Section": numbered eyebrow + title on the left, a vertical
 * hairline divider, prose on the right — the template's title/body split
 * grammar.
 */
export function ContentSection({
  num,
  eyebrow,
  title,
  titleId,
  children
}: {
  num: string;
  eyebrow: string;
  title: string;
  titleId?: string;
  children: ReactNode;
}) {
  return (
    <div className="content-split">
      <div className="content-split__head">
        <Eyebrow>{`${num} / ${eyebrow}`}</Eyebrow>
        <h2 id={titleId} className="content-split__title">
          {title}
        </h2>
      </div>
      <Divider vertical />
      <div className="content-split__body">{children}</div>
    </div>
  );
}
