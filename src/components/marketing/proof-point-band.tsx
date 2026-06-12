import { projects } from "@/content/projects";

/**
 * Reviews slot — honest, no fabricated testimonials. Synk's Reviews band maps
 * to a distilled set of real proof points pulled from the projects' content,
 * each attributed to the product it describes. These are design-posture facts,
 * not invented quotes.
 */
const PICKS: { slug: string; index: number }[] = [
  { slug: "harness", index: 0 },
  { slug: "registry", index: 0 },
  { slug: "orchestra", index: 0 },
  { slug: "intercal", index: 1 },
  { slug: "collectiva", index: 1 },
  { slug: "harness", index: 1 }
];

const bySlug = Object.fromEntries(projects.map((project) => [project.slug, project]));

export function ProofPointBand() {
  const items = PICKS.map(({ slug, index }, i) => {
    const project = bySlug[slug];
    const point = project?.proofPoints[index];
    return point ? { id: `${slug}-${index}-${i}`, name: project.shortName, point } : null;
  }).filter((item): item is { id: string; name: string; point: string } => item !== null);

  return (
    <div className="proofpoint-grid">
      {items.map((item, index) => (
        <article className="proofpoint" key={item.id}>
          <span className="proofpoint-mark">{String(index + 1).padStart(2, "0")}</span>
          <p>{item.point}</p>
          <span className="proofpoint-src">— {item.name}</span>
        </article>
      ))}
    </div>
  );
}
