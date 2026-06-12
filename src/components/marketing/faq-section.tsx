import { site } from "@/content/site";
import { Container, Section } from "@/components/layout/container";
import { SectionHeading } from "@/components/system/section-heading";

/**
 * FAQ Section (Bmt3PaPvb in Noir's tree) → editorial Q&A from `site.faqs`. Native
 * `<details>` accordion so it works without JS and stays reduced-motion friendly.
 */
export function FaqSection() {
  return (
    <Section className="faq-section" ariaLabelledby="faq-heading">
      <Container>
        <SectionHeading
          index="07"
          eyebrow="Source boundaries"
          id="faq-heading"
          title="What this hub is, and isn't."
        />

        <div className="faq-list">
          {site.faqs.map((faq, i) => (
            <details key={faq.question} className="faq-row" name="faq">
              <summary className="faq-summary">
                <span className="faq-index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="faq-question">{faq.question}</span>
                <span className="faq-chevron" aria-hidden="true">
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
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
