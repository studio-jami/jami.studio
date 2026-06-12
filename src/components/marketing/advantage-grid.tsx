import { PixelArrow } from "@/components/system/pixel-icons";
import { projects } from "@/content/projects";

/**
 * Synk's "What you can expect" grid: a bordered 3×2 dashed lattice of compact
 * feature cells, each with a narrow pixel-► icon rail, a raised title strip,
 * and a description. Every description is a REAL capability string from a
 * product's own content; the short title is its honest distillation, and the
 * source product is named in the cell.
 */
const bySlug = Object.fromEntries(projects.map((project) => [project.slug, project]));

const PICKS: { slug: string; index: number; title: string }[] = [
  { slug: "harness", index: 0, title: "Governed runs" },
  { slug: "registry", index: 2, title: "Trusted payloads" },
  { slug: "orchestra", index: 3, title: "Approval checkpoints" },
  { slug: "intercal", index: 0, title: "Temporal knowledge" },
  { slug: "collectiva", index: 1, title: "Open governance" },
  { slug: "harness", index: 3, title: "Durable state" }
];

export function AdvantageGrid() {
  const cards = PICKS.flatMap(({ slug, index, title }, i) => {
    const project = bySlug[slug];
    const capability = project?.capabilities[index];
    return capability
      ? [{ id: `${slug}-${index}-${i}`, name: project.shortName, capability, title }]
      : [];
  });

  return (
    <div className="lattice cols-3">
      {cards.map((card) => (
        <article className="expect-cell" key={card.id}>
          <span className="expect-icon" aria-hidden="true">
            <PixelArrow />
          </span>
          <div className="expect-title">
            <h3>{card.title}</h3>
          </div>
          <span className="expect-rail" aria-hidden="true" />
          <div className="expect-body">
            <p>{card.capability}.</p>
            <span className="expect-src">{card.name}</span>
          </div>
        </article>
      ))}
    </div>
  );
}
