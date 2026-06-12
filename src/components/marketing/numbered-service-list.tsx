import { site } from "@/content/site";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/system/section-heading";

/**
 * Service Section → the four home pillars as numbered "services" with progressive
 * disclosure. Native `<details>` accordion: no client JS, works without hydration,
 * and the open/close transition is CSS-gated under prefers-reduced-motion.
 */
export function NumberedServiceList() {
  const { pillars } = site.home;

  return (
    <Section className="service-section" ariaLabelledby="service-heading">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="What the studio stands for"
          id="service-heading"
          title="Four foundations the family is built on."
        />

        <div className="service-list">
          {pillars.map((pillar, i) => (
            <details key={pillar.title} className="service-row" name="service">
              <summary className="service-summary">
                <span className="service-index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="service-title">{pillar.title}</span>
                <span className="service-chevron" aria-hidden="true">
                  <svg viewBox="0 0 16 16" width="16" height="16" fill="none">
                    <path
                      d="M4 6l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </summary>
              <div className="service-body">
                <p>{pillar.body}</p>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
