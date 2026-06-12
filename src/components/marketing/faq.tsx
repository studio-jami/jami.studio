import { site } from "@/content/site";

/**
 * FAQ — Synk's FAQ Section. Native <details>/<summary> accordion so it parses
 * cleanly for assistive tech and agents, with no client JS. One open at a time
 * is not enforced (multiple can expand), matching an editorial Q&A list.
 */
export function Faq() {
  return (
    <div className="faq-list">
      {site.faqs.map((faq, index) => (
        <details className="faq-item" key={faq.question} {...(index === 0 ? { open: true } : {})}>
          <summary>
            <span>{faq.question}</span>
            <span className="faq-sign" aria-hidden="true">
              +
            </span>
          </summary>
          <p className="faq-answer">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
