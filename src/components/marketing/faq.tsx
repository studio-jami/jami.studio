import { Container } from "@/components/ui/layout";
import { GhostBadge } from "@/components/ui/primitives";
import { site } from "@/content/site";

/**
 * FAQ — editorial Q&A from `site.faqs`. Uses native <details> so answers parse
 * in initial HTML (good for agents and no-JS) while still collapsing. A sticky
 * head column anchors the section on wide screens.
 */
export function Faq({ id }: { id: string }) {
  return (
    <Container as="div" className="faq">
      <div className="faq-head">
        <GhostBadge>Questions</GhostBadge>
        <h2 id={id} className="display-2">
          What this hub is, and what it is not
        </h2>
        <p className="prose">
          Straight answers about the boundary between this site and the product runtimes it
          presents.
        </p>
      </div>

      <div className="faq-list">
        {site.faqs.map((faq, i) => (
          <details className="faq-item" key={faq.question} open={i === 0}>
            <summary>
              {faq.question}
              <span className="faq-item-icon" aria-hidden="true">
                +
              </span>
            </summary>
            <p className="faq-item-answer">{faq.answer}</p>
          </details>
        ))}
      </div>
    </Container>
  );
}
