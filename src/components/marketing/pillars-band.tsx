import { Reveal } from "@/components/system/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/content/site";

/** The four home pillars as a "what this studio stands for" statement band. */
export function PillarsBand() {
  return (
    <Section divider aria-labelledby="pillars-title">
      <SectionHeading
        number="01"
        eyebrow="What the studio stands for"
        title={<span id="pillars-title">Four guarantees across the family.</span>}
        lead="Every product inherits the same posture: governed execution, trusted interfaces, durable coordination, and agent-readable knowledge."
      />
      <ul className="pillars-grid">
        {site.home.pillars.map((pillar, index) => (
          <Reveal as="li" key={pillar.title} className="pillar-card" index={index}>
            <span className="pillar-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3>{pillar.title}</h3>
            <p>{pillar.body}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
