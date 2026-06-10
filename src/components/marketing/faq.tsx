import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/content/site";

/** Editorial Q&A — calm, scannable, and fully present in the initial HTML. */
export function Faq({ number }: { number: string }) {
  return (
    <Section className="faq-section">
      <Reveal>
        <SectionHeading number={number} kicker="Questions" title="Boundaries, stated plainly." />
      </Reveal>
      <dl className="faq">
        {site.faqs.map((faq, index) => (
          <Reveal key={faq.question} delay={index * 60} className="faq-item">
            <dt>
              <span className="faq-no" aria-hidden="true">
                Q{index + 1}
              </span>
              {faq.question}
            </dt>
            <dd>{faq.answer}</dd>
          </Reveal>
        ))}
      </dl>
    </Section>
  );
}
