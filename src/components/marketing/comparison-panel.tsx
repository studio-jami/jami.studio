import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { site } from "@/content/site";

/**
 * Comparison — Nouva's two-column us-vs-them panel inside one Surface card. Honest
 * framing, no invented competitor: the left "them" column is the generic site-template
 * approach (fabricated logos, placeholder metrics, hand-maintained links); the right
 * "us" column is an inset, highlighted Surface-3 describing jami.studio's actual posture
 * (generated from one shared source, real proof, open-core). No fake names or numbers.
 */
const them = [
  "Hand-maintained links that drift out of sync",
  "Placeholder copy and stock metrics that prove nothing",
  "Fabricated logos and quotes standing in for real work",
  "Implementation tangled into the marketing surface"
];

const us = [
  "Routes, links, and metadata generated from one source",
  "Real product summaries, capabilities, and proof posture",
  "Five real projects, each linking to its own repository",
  "Runtimes kept in their own repos — this hub only markets"
];

function Mark({ kind }: { kind: "minus" | "plus" }) {
  return (
    <span className={`comparison-mark comparison-mark--${kind}`} aria-hidden="true">
      {kind === "plus" ? (
        <svg
          viewBox="0 0 24 24"
          width="13"
          height="13"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M6 12h12" />
        </svg>
      )}
    </span>
  );
}

export function ComparisonPanel() {
  return (
    <section className="section" aria-labelledby="comparison-title">
      <Container>
        <SectionHeading
          eyebrow="Why this approach"
          title={
            <>
              Generic templates fall short.{" "}
              <span className="title-soft">Here&apos;s the honest difference.</span>
            </>
          }
          titleId="comparison-title"
          align="center"
        />

        <div className="comparison-panel">
          <div className="comparison-col comparison-col--them">
            <div className="comparison-col-head">
              <span className="comparison-col-label">Generic site templates</span>
            </div>
            <ul className="comparison-list">
              {them.map((item) => (
                <li className="comparison-item" key={item}>
                  <Mark kind="minus" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="comparison-col comparison-col--us">
            <div className="comparison-col-head">
              <span className="badge badge--solid">{site.name}</span>
              <span className="comparison-col-label">Generated from one source</span>
            </div>
            <ul className="comparison-list">
              {us.map((item) => (
                <li className="comparison-item" key={item}>
                  <Mark kind="plus" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
