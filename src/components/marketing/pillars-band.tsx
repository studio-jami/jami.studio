import { Reveal } from "@/components/primitives/reveal";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { site } from "@/content/site";

/** The four home pillars as a "what this studio stands for" statement band. */
export function PillarsBand() {
  return (
    <Section id="principles" rhythm="default" aria-labelledby="pillars-title">
      <SectionHeading
        eyebrow="What it stands for"
        index="01"
        id="pillars-title"
        title="Four foundations, one coherent surface."
        lead="Each product owns a layer of the agent-native stack. Together they read as a single, governed system."
      />
      <div className="pillars-grid">
        {site.home.pillars.map((pillar, index) => (
          <Reveal key={pillar.title} delay={index * 70}>
            <article className="pillar-card">
              <span className="pillar-index">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-body">{pillar.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
