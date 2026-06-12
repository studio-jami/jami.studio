import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/system/section-heading";

/**
 * Stats Section → an honest facts row. NO fabricated metrics, no "trusted by N teams".
 * Every figure is a count of something real in the content contracts (products, routes,
 * approach), with the studio's proof line carrying the qualitative claim. Counts derive
 * from the data so they can never drift from reality.
 */
export function HonestFactsRow() {
  const productCount = projects.length;
  const pillarCount = site.home.pillars.length;

  const facts: { value: string; label: string }[] = [
    { value: String(productCount).padStart(2, "0"), label: "Products in the family" },
    { value: "01", label: "Shared source of record" },
    { value: String(pillarCount).padStart(2, "0"), label: "Foundations they share" },
    { value: "OSS", label: "Open-core posture" }
  ];

  return (
    <Section className="facts-section" ariaLabelledby="facts-heading">
      <Container>
        <SectionHeading
          index="03"
          eyebrow="By the numbers"
          id="facts-heading"
          title="Counted, not claimed."
          lead={site.home.proof}
        />

        <dl className="facts-row">
          {facts.map((fact) => (
            <div className="fact" key={fact.label}>
              <dt className="fact-value">{fact.value}</dt>
              <dd className="fact-label">{fact.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
