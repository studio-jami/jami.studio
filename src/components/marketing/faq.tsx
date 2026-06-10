import { site } from "@/content/site";

/**
 * Editorial Q&A from `site.faqs`. Uses native <details>/<summary> so it is
 * accessible and works without JS; the marker animation is pure CSS and the
 * answer text is in the initial HTML for AI readers.
 */
export function Faq() {
  return (
    <ul className="faq-list">
      {site.faqs.map((faq, index) => (
        <li key={faq.question} className="faq-item">
          <details name="studio-faq" {...(index === 0 ? { open: true } : {})}>
            <summary className="faq-question">
              <span className="faq-index">{String(index + 1).padStart(2, "0")}</span>
              <span className="faq-question-text">{faq.question}</span>
              <span className="faq-icon" aria-hidden="true" />
            </summary>
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          </details>
        </li>
      ))}
    </ul>
  );
}
