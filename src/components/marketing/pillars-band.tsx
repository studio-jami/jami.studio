import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/system/reveal";
import { site } from "@/content/site";

/** The four home pillars as a hairline-divided statement band (what the studio stands for). */
export function PillarsBand() {
  return (
    <Section aria-label="What the studio stands for">
      <Reveal>
        <SectionHeading
          eyebrow="What we stand for"
          title="Foundations agents can run on, and teams can trust."
          lead={site.home.lead}
          headingId="pillars-heading"
        />
      </Reveal>
      <Reveal>
        <div className="pillars">
          {site.home.pillars.map((pillar, index) => (
            <div className="pillar" key={pillar.title}>
              <span className="pillar-index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{pillar.title}</h3>
              <p>{pillar.body}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
