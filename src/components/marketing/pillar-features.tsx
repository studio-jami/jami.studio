import { Reveal } from "@/components/system/reveal";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { site } from "@/content/site";

/**
 * Features — the four home pillars as oversized editorial feature blocks. Each is a
 * full-width numbered row (number + title on the left, body on the right) with a hairline
 * divider between, echoing Nouva's stacked "feature block" rhythm rather than a generic
 * three-up grid.
 */
function PillarFeatureBlock({
  index,
  title,
  body
}: {
  index: number;
  title: string;
  body: string;
}) {
  return (
    <Reveal as="article" className="pillar-block" delay={index * 60}>
      <div className="pillar-block-lead">
        <span className="pillar-block-num">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="pillar-block-title">{title}</h3>
      </div>
      <p className="pillar-block-body">{body}</p>
    </Reveal>
  );
}

export function PillarFeatures() {
  return (
    <Section className="features" divided aria-labelledby="features-title">
      <SectionHeading
        number="02"
        eyebrow="What the studio stands for"
        title="Four foundations the family is built on."
        titleId="features-title"
      />
      <div className="pillar-blocks">
        {site.home.pillars.map((pillar, index) => (
          <PillarFeatureBlock
            key={pillar.title}
            index={index}
            title={pillar.title}
            body={pillar.body}
          />
        ))}
      </div>
    </Section>
  );
}
