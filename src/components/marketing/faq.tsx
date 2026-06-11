import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/content/site";

/**
 * FAQ as native <details> disclosures — static-first, content fully present in
 * initial HTML, keyboard-accessible and reduced-motion-safe with no JS required.
 */
export function FAQ() {
  return (
    <Section divider className="faq-section" aria-labelledby="faq-title">
      <SectionHeading
        number="04"
        eyebrow="Questions"
        title={<span id="faq-title">Built for human and agent readers.</span>}
        lead="What this repository owns, where the runtimes live, and why the site publishes AI-readable source."
      />
      <div className="faq-list">
        {site.faqs.map((faq, index) => (
          <details className="faq-item" key={faq.question} name="faq" {...(index === 0 ? { open: true } : {})}>
            <summary>
              <span className="faq-q-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="faq-q-text">{faq.question}</span>
              <span className="faq-q-icon" aria-hidden="true">
                <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M8 3v10M3 8h10" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </Section>
  );
}
