import { Section, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/system/reveal";
import { site } from "@/content/site";

/**
 * FAQ as a native <details>/<summary> accordion (works without JS, keyboard-accessible).
 * Content from `site.faqs`. The first item is open by default so the section reads as
 * content, not an empty list.
 */
export function FAQ() {
  return (
    <Section aria-labelledby="faq-heading">
      <Reveal>
        <SectionHeading
          eyebrow="Questions"
          title="Designed for human and agent readers"
          lead="The boundaries between this hub and the product runtimes, stated plainly."
          headingId="faq-heading"
        />
      </Reveal>
      <Reveal>
        <div className="faq-list">
          {site.faqs.map((faq, index) => (
            <details className="faq-item" key={faq.question} open={index === 0}>
              <summary className="faq-summary">
                {faq.question}
                <span className="faq-icon" aria-hidden="true" />
              </summary>
              <p className="faq-answer">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
