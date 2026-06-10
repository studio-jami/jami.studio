import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading, formatIndex } from "@/components/ui/section-heading";
import { site } from "@/content/site";

/** The four foundations the studio stands on, as a quiet statement band. */
export function PillarsBand({ number }: { number: string }) {
  return (
    <Section className="pillars">
      <Reveal>
        <SectionHeading
          number={number}
          kicker="Foundations"
          title="What the studio stands on."
        />
      </Reveal>
      <ul className="pillar-grid">
        {site.home.pillars.map((pillar, index) => (
          <li className="pillar" key={pillar.title}>
            <Reveal delay={index * 60}>
              <span className="pillar-no" aria-hidden="true">
                {formatIndex(index + 1)}
              </span>
              <h3 className="pillar-title">{pillar.title}</h3>
              <p className="pillar-body">{pillar.body}</p>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  );
}
