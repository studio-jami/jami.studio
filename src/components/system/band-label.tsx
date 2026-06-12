import type { ReactNode } from "react";

type BandLabelProps = {
  /** The colossal left-aligned band word (WORKS / SERVICES / BLOGS …). */
  word: string;
  /** Optional circled count rendered as a superscript next to the word. */
  count?: number;
  id?: string;
  as?: "h1" | "h2";
  children?: ReactNode;
};

/**
 * Noir's colossal left-aligned section band heading — a giant uppercase Instrument-Sans
 * word ("WORKS", "SERVICES", "BLOGS") with an optional circled count superscript, sitting
 * on a faint dotted-grid band. The defining section-marker rhythm of the template.
 */
export function BandLabel({ word, count, id, as: Heading = "h2", children }: BandLabelProps) {
  return (
    <div className="band-label">
      <div className="band-label-dots" aria-hidden="true" />
      <Heading id={id} className="band-label-word">
        <span className="band-word-plate">
          {word}
          {typeof count === "number" ? (
            <span className="band-label-count" aria-hidden="true">
              {count}
            </span>
          ) : null}
        </span>
      </Heading>
      {children ? <div className="band-label-aside">{children}</div> : null}
    </div>
  );
}
