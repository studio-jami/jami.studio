import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";

/**
 * Features — Nouva's sticky-stacking feature blocks. Each block is a full-width Surface
 * card that pins to the top of the viewport and the next one stacks over it on scroll
 * (CSS `position: sticky`). Each is a horizontal split: copy on the left, a rendered
 * card-on-card "visual" on the right (no downloaded image). The blocks expand the
 * governed-runtime / shared-source story. Under reduced motion the pin is disabled.
 */
type Block = {
  index: string;
  title: string;
  body: string;
  tags: string[];
  chips: { label: string; value: string; accent?: boolean }[];
};

const blocks: Block[] = [
  {
    index: "Feature 01",
    title: "One governed runtime, every action policy-gated.",
    body: "Tools, memory, approvals, model routing, and user-facing actions all flow through a single enforcement path — no UI backdoors, no duplicated checks.",
    tags: ["Policy-gated", "BYOK", "Durable runs"],
    chips: [
      { label: "tool.call", value: "checked" },
      { label: "memory.read", value: "checked" },
      { label: "user.action", value: "checked", accent: true }
    ]
  },
  {
    index: "Feature 02",
    title: "A trusted UI vocabulary agents can speak safely.",
    body: "Payloads name resident components and props validate against a registry, so agents author interfaces without ever injecting runtime code into the app.",
    tags: ["Tokenized", "Allowlisted", "Fallbacks"],
    chips: [
      { label: "component", value: "resident" },
      { label: "props", value: "validated" },
      { label: "unknown", value: "fallback", accent: true }
    ]
  },
  {
    index: "Feature 03",
    title: "Coordination and knowledge kept out of the loop.",
    body: "Work records, squads, approvals, provenance, and temporal context live in their own surfaces — durable source, not chat memory, and never tangled with the core agent loop.",
    tags: ["Work records", "Provenance", "Temporal"],
    chips: [
      { label: "run.supervised", value: "streamed" },
      { label: "delta.tracked", value: "fresh" },
      { label: "source.of.truth", value: "shared", accent: true }
    ]
  }
];

export function StickyFeatures() {
  return (
    <section className="section" aria-labelledby="features-title">
      <Container>
        <SectionHeading
          eyebrow="Built on one runtime"
          title={
            <>
              One platform that governs{" "}
              <span className="title-soft">everything agents produce.</span>
            </>
          }
          titleId="features-title"
          align="center"
        />

        <div className="sticky-stack">
          {blocks.map((block) => (
            <article className="sticky-block" key={block.index}>
              <div className="sticky-block-copy">
                <p className="sticky-block-index">{block.index}</p>
                <h3 className="sticky-block-title">{block.title}</h3>
                <p className="sticky-block-body">{block.body}</p>
                <div className="sticky-block-tags">
                  {block.tags.map((tag) => (
                    <span className="badge badge--outline" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="sticky-block-visual" aria-hidden="true">
                <div className="sticky-block-visual-grid">
                  {block.chips.map((chip) => (
                    <div
                      className={["sticky-block-chip", chip.accent ? "sticky-block-chip--accent" : null]
                        .filter(Boolean)
                        .join(" ")}
                      key={chip.label}
                    >
                      <span>{chip.label}</span>
                      <span>{chip.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
