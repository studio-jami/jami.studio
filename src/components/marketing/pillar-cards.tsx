import { site } from "@/content/site";

/**
 * Features slot — the four home pillars as a 2x2 grid of hairline-framed cells
 * (Synk's "2x2 Grid" of Feature Cards). Each cell carries a numbered marker.
 */
export function PillarCards() {
  return (
    <div className="cell-grid cols-2">
      {site.home.pillars.map((pillar, index) => (
        <article className="cell" key={pillar.title}>
          <div className="cell-head">
            <span className="cell-num">{String(index + 1).padStart(2, "0")}</span>
            <h3>{pillar.title}</h3>
          </div>
          <p>{pillar.body}</p>
        </article>
      ))}
    </div>
  );
}
