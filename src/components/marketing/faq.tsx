import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/content/site";

/**
 * Editorial Q&A accordion built on native <details>/<summary> so it works without JS and stays in
 * the initial HTML (static-first, AI-readable). Copy comes from site.faqs.
 */
export function FAQ() {
  return (
    <Section id="faq" aria-labelledby="faq-title">
      <SectionHeading
        number="03"
        eyebrow="Questions"
        title="How the hub fits the family"
        id="faq-title"
      />
      <div className="faq" style={{ marginTop: "2.5rem" }}>
        {site.faqs.map((faq, index) => (
          <details className="faq-item" key={faq.question} open={index === 0}>
            <summary>
              {faq.question}
              <span className="faq-icon" aria-hidden="true" />
            </summary>
            <p className="faq-answer">{faq.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
