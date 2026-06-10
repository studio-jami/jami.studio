import { site } from "@/content/site";

/**
 * Editorial Q&A list using native <details>/<summary> — accessible, keyboard
 * operable, and progressive-disclosure by construction without client JS.
 */
export function Faq() {
  return (
    <div className="faq">
      {site.faqs.map((faq, index) => (
        <details key={faq.question} className="faq__item" {...(index === 0 ? { open: true } : {})}>
          <summary className="faq__summary">
            <span className="faq__index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="faq__question">{faq.question}</span>
            <span className="faq__icon" aria-hidden="true" />
          </summary>
          <div className="faq__answer">
            <p>{faq.answer}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
