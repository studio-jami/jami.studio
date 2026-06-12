import { FamilyGlyph } from "@/components/system/pixel-icons";
import { projects } from "@/content/projects";

/**
 * Synk's trusted-by logo marquee, honestly substituted: the auto-scrolling
 * tile band carries the five REAL product names plus the shared-source proof
 * — never invented company logos. CSS-only loop; pauses on hover and under
 * reduced motion (where it becomes a scrollable row).
 */
export function TrustedMarquee() {
  const tiles = [
    ...projects.map((project) => ({ key: project.slug, label: project.shortName })),
    { key: "source", label: "One shared source" }
  ];

  return (
    <section className="marquee-band" aria-label="The Studio product family">
      <div className="marquee">
        {[0, 1].map((set) => (
          <div className="marquee-set" key={set} {...(set === 1 ? { "aria-hidden": true } : {})}>
            {tiles.map((tile) => (
              <span className="marquee-tile" key={`${set}-${tile.key}`}>
                <FamilyGlyph kind={tile.key} />
                {tile.label}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
