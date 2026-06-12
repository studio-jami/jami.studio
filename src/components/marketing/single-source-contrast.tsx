import { Reveal } from "@/components/system/reveal";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { site } from "@/content/site";

/**
 * Comparison slot, reframed honestly — NOT a competitor table. A structural before/after
 * drawn from `site.home.proof`: scattered, bespoke surfaces on the left vs. one shared
 * source on the right (accent-highlighted). No invented rival, no fabricated claims.
 */
const scattered = [
  "Routes, metadata, and feeds drift apart as each surface is hand-maintained.",
  "Project links and CTAs are rebuilt by hand and quietly fall out of sync.",
  "AI readers stitch the product family together from inconsistent pages."
];

const shared = [
  "Every route, link, and metadata field is generated from one content model.",
  "CTAs resolve through a single route layer, so a move never rewrites copy.",
  "Compact and full AI source files are published from the same shared data."
];

export function SingleSourceContrast() {
  return (
    <Section className="contrast" divided aria-labelledby="contrast-title">
      <SectionHeading
        number="04"
        eyebrow="Single source"
        title="Scattered surfaces, or one shared source of truth."
        titleId="contrast-title"
        lead={site.home.proof}
      />

      <div className="contrast-columns">
        <Reveal as="div" className="contrast-col contrast-col--before">
          <p className="contrast-col-label">Without a shared source</p>
          <ul>
            {scattered.map((item) => (
              <li key={item}>
                <span className="contrast-bullet contrast-bullet--minus" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="div" className="contrast-col contrast-col--after" delay={90}>
          <p className="contrast-col-label">{site.name}</p>
          <ul>
            {shared.map((item) => (
              <li key={item}>
                <span className="contrast-bullet contrast-bullet--plus" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
