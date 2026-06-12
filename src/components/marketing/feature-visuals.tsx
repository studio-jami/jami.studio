import { Badge } from "@/components/ui/primitives";

/**
 * Decorative "screen" visuals for the feature beats. These are abstract,
 * token-driven structural representations — no fabricated metrics, logos, or UI
 * claims, just the shape of the idea each beat describes. aria-hidden: the text
 * column carries the meaning.
 */

/** Beat 1 — Governed runtime: a single enforced path of gated steps. */
export function RuntimeFlowVisual() {
  const steps = [
    { glyph: "→", title: "Request", sub: "tool call or user action" },
    { glyph: "✓", title: "Policy gate", sub: "one enforcement path" },
    { glyph: "↻", title: "Durable run", sub: "resumable state + memory" }
  ];

  return (
    <div className="feature-visual" aria-hidden="true">
      <div className="feature-visual-bar">
        <i />
        <i />
        <i />
        <span>governed loop</span>
      </div>
      <div className="feature-visual-body">
        {steps.map((step) => (
          <div className="feature-line" key={step.title}>
            <span className="feature-line-glyph">{step.glyph}</span>
            <span>
              <strong>{step.title}</strong>
              <span>{step.sub}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Beat 2 — Trusted interfaces: a tokenized component vocabulary. */
export function InterfaceVocabVisual() {
  const cards = [
    { title: "Tokens", sub: "shared visual contract" },
    { title: "Registry", sub: "resident components" },
    { title: "Payload", sub: "allowlisted props" },
    { title: "Fallback", sub: "graceful unknowns" }
  ];

  return (
    <div className="feature-visual" aria-hidden="true">
      <div className="feature-visual-bar">
        <i />
        <i />
        <i />
        <span>render contract</span>
      </div>
      <div className="feature-visual-body">
        <div className="feature-chip-row">
          <Badge tone="accent">--accent</Badge>
          <Badge>--radius</Badge>
          <Badge>--surface</Badge>
          <Badge>--ring</Badge>
        </div>
        <div className="feature-cards">
          {cards.map((card) => (
            <div className="feature-card" key={card.title}>
              <strong>{card.title}</strong>
              <span>{card.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
