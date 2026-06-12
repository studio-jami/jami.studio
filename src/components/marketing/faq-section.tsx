import Image from "next/image";
import { site } from "@/content/site";
import { Container } from "@/components/layout/container";

/**
 * FAQ — Noir's split layout: left, the display heading (bright first line, muted second)
 * with the orange-velvet portrait visual beneath; right, the numbered accordion. Native
 * `<details>` so it works without JS; the first item ships open like the template; answer
 * text speaks in the mono micro-label voice.
 */
export function FaqSection() {
  return (
    <section className="faq-section section" aria-labelledby="faq-heading">
      <Container className="faq-grid">
        <div className="faq-left">
          <h2 id="faq-heading" className="faq-heading">
            Things you might wonder.
            <span className="faq-heading-soft"> Answers from the source.</span>
          </h2>
          <figure className="faq-portrait">
            <Image
              src="/assets/faq.png"
              alt="Editorial portrait study in orange velvet tones"
              width={864}
              height={1152}
              sizes="(max-width: 768px) 80vw, 26vw"
            />
          </figure>
        </div>

        <div className="faq-list">
          {site.faqs.map((faq, i) => (
            <details key={faq.question} className="faq-row" name="faq" open={i === 0}>
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
    </section>
  );
}
