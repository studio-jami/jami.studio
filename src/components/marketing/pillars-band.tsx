import { Reveal } from "@/components/system/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/content/site";

/** The four home pillars as the "what this studio stands for" statement band. */
export function PillarsBand() {
  return (
    <Section id="pillars" tight aria-labelledby="pillars-title">
      <SectionHeading
        number="01"
        eyebrow="What the studio stands for"
        title="Four commitments under one roof"
        id="pillars-title"
      />
      <div className="pillars" style={{ marginTop: "2.5rem" }}>
        {site.home.pillars.map((pillar, index) => (
          <Reveal as="article" key={pillar.title} className="pillar" delay={index * 70}>
            <span className="pillar-number">{String(index + 1).padStart(2, "0")}</span>
            <h3>{pillar.title}</h3>
            <p>{pillar.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
