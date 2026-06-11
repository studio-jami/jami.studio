import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/content/site";

/**
 * The four home pillars as a "what this studio stands for" statement band. Numbered cards
 * (Kirimo's numbered Service List rhythm) — hairline-separated, accent number, quiet panel.
 */
export function PillarsBand() {
  return (
    <Section className="pillars-band" aria-labelledby="pillars-title">
      <SectionHeading
        eyebrow="What the studio stands for"
        number="01"
        title="Four foundations, one coherent surface."
        lead={site.home.proof}
      />
      <ul className="pillars-list">
        {site.home.pillars.map((pillar, index) => (
          <li className="pillar-row" key={pillar.title}>
            <span className="pillar-num" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="pillar-body">
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-text">{pillar.body}</p>
            </div>
            <Eyebrow as="span" className="pillar-tag">
              OSS
            </Eyebrow>
          </li>
        ))}
      </ul>
    </Section>
  );
}
