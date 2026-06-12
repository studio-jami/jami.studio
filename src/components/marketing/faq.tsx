import { Container } from "@/components/ui/layout";
import { GhostBadge } from "@/components/ui/primitives";
import { PlusIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/system/reveal";
import { site } from "@/content/site";

/**
 * FAQ (template FAQ) — ghost-pill label, two-tone heading, and the questions as
 * a two-column grid of expandable hairline rows with a rotating "+" affordance.
 * Native <details> keeps every answer in the initial HTML (good for agents and
 * no-JS) while still collapsing.
 */
export function Faq({ id }: { id: string }) {
  return (
    <Container as="div">
      <Reveal className="section-head">
        <GhostBadge>FAQ</GhostBadge>
        <h2 id={id}>
          Your questions, <span className="heading-soft">answered with clarity.</span>
        </h2>
      </Reveal>

      <Reveal>
        <div className="faq-grid">
          {site.faqs.map((faq) => (
            <details className="faq-item" key={faq.question}>
              <summary>
                {faq.question}
                <span className="faq-item-icon" aria-hidden="true">
                  <PlusIcon size={16} />
                </span>
              </summary>
              <p className="faq-item-answer">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Reveal>
    </Container>
  );
}
