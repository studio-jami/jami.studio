import { ButtonLink } from "@/components/primitives/button";
import { Reveal } from "@/components/system/reveal";
import { Section } from "@/components/primitives/section";
import { SectionHeading } from "@/components/primitives/section-heading";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

/**
 * Benefits — distilled capability themes drawn directly from the projects' real
 * `capabilities[]`, framed as cross-family benefits. Nouva's Benefits rhythm: a headline,
 * an inset CTA panel, and a six-cell grid of benefit cards. Each benefit cites its
 * owning product so nothing is fabricated.
 */
const benefitSelectors: { slug: string; capabilityIndex: number }[] = [
  { slug: "harness", capabilityIndex: 0 },
  { slug: "registry", capabilityIndex: 2 },
  { slug: "orchestra", capabilityIndex: 0 },
  { slug: "intercal", capabilityIndex: 0 },
  { slug: "collectiva", capabilityIndex: 1 },
  { slug: "harness", capabilityIndex: 3 }
];

export function BenefitsList() {
  const benefits = benefitSelectors
    .map(({ slug, capabilityIndex }) => {
      const project = projects.find((entry) => entry.slug === slug);
      if (!project) return null;
      return {
        key: `${slug}-${capabilityIndex}`,
        owner: project.shortName,
        text: project.capabilities[capabilityIndex] ?? project.capabilities[0]
      };
    })
    .filter((value): value is { key: string; owner: string; text: string } => value !== null);

  return (
    <Section className="benefits" divided aria-labelledby="benefits-title">
      <SectionHeading
        number="03"
        eyebrow="Across the family"
        title="Capabilities that compound across the stack."
        titleId="benefits-title"
      />

      <div className="benefits-layout">
        <Reveal as="aside" className="benefits-cta">
          <p className="benefits-cta-kicker eyebrow">Selected work</p>
          <p className="benefits-cta-copy">
            Each capability ships inside a product you can open, read, and run from its own
            repository.
          </p>
          <ButtonLink href={site.home.primaryCta.href} variant="primary" size="md">
            {site.home.primaryCta.label}
          </ButtonLink>
        </Reveal>

        <ul className="benefits-grid">
          {benefits.map((benefit, index) => (
            <Reveal as="li" className="benefit-card" key={benefit.key} delay={index * 50}>
              <span className="benefit-owner">{benefit.owner}</span>
              <p className="benefit-text">{benefit.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
