import { Eyebrow } from "@/components/ui/eyebrow";

type ListingProps = {
  index?: string;
  eyebrow: string;
  title: string;
  items: string[];
  titleId?: string;
  /** Numbered rows (capabilities) vs. plain proof rows. */
  numbered?: boolean;
};

/**
 * "Listing" — the Kirimo detail structured list: a titled block of numbered or
 * bulleted rows. Carries capabilities and proof points as progressive, scannable
 * lists straight from the project record.
 */
export function Listing({ index, eyebrow, title, items, titleId, numbered = true }: ListingProps) {
  return (
    <section className="listing" aria-labelledby={titleId}>
      <div className="listing-head">
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
        <h2 id={titleId} className="listing-title">
          {title}
        </h2>
      </div>
      <ul className={`listing-rows ${numbered ? "listing-numbered" : ""}`}>
        {items.map((item, itemIndex) => (
          <li key={item} className="listing-row">
            {numbered ? (
              <span className="listing-row-index">{String(itemIndex + 1).padStart(2, "0")}</span>
            ) : (
              <span className="listing-row-marker" aria-hidden="true" />
            )}
            <span className="listing-row-text">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
