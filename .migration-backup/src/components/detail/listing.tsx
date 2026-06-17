/**
 * Kirimo "Listing": structured rows over hairlines. `numbered` renders the
 * 01/02/03 index column (capabilities); unnumbered rows lead with a small
 * terra-cotta quote mark (proof points), echoing the big-quote treatment.
 */
export function Listing({ items, numbered = true }: { items: readonly string[]; numbered?: boolean }) {
  return (
    <ol className={numbered ? "listing listing--numbered" : "listing"}>
      {items.map((item, index) => (
        <li key={item} className="listing__row">
          {numbered ? (
            <span className="listing__num" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
          ) : (
            <span className="listing__quote" aria-hidden="true">
              &ldquo;
            </span>
          )}
          <p className="listing__text">{item}.</p>
        </li>
      ))}
    </ol>
  );
}
