import Image from "next/image";
import { Container } from "@/components/primitives/container";
import { SectionHeading } from "@/components/primitives/section-heading";
import { ButtonLink } from "@/components/primitives/button";
import { getProject } from "@/content/projects";

/**
 * Features — Nouva's sticky-stacking feature blocks. Each block is a full-width Surface
 * card that pins to the top of the viewport and the next one stacks over it on scroll
 * (CSS `position: sticky`; disabled under reduced motion). Template structure: the
 * MEDIA side is our generated dusk photograph with a translucent glass UI panel
 * (HTML/CSS — big number, tabs, progress rows) floating on it; copy + a light pill CTA
 * sit on the right. Every number shown is real (1 enforcement path, 48 vars in the
 * shared token contract, 5 products) and every CTA resolves through the content layer.
 */

type GlassSpec = {
  head: string;
  tabs?: string[];
  kicker: string;
  num: string;
  tag: string;
  rows?: { label: string; value: string; fill?: string }[];
  caption: string;
};

type Block = {
  index: string;
  title: string;
  body: string;
  tags: string[];
  photo: string;
  ctaSlug: "harness" | "registry" | "orchestra";
  ctaLabel: string;
  glass: GlassSpec;
};

const blocks: Block[] = [
  {
    index: "Feature 01",
    title: "One governed runtime, every action policy-gated.",
    body: "Tools, memory, approvals, model routing, and user-facing actions all flow through a single enforcement path — no UI backdoors, no duplicated checks.",
    tags: ["Policy-gated", "BYOK", "Durable runs"],
    photo: "/assets/feature-1.png",
    ctaSlug: "harness",
    ctaLabel: "Explore Harness",
    glass: {
      head: "Enforcement path",
      tabs: ["Tools", "Memory", "Actions"],
      kicker: "Paths into the runtime",
      num: "1",
      tag: "shared gate",
      rows: [
        { label: "tool.call", value: "gated", fill: "100%" },
        { label: "memory.read", value: "gated", fill: "100%" },
        { label: "user.action", value: "gated", fill: "100%" }
      ],
      caption: "Every action checked by the same policy"
    }
  },
  {
    index: "Feature 02",
    title: "A trusted UI vocabulary agents can speak safely.",
    body: "Payloads name resident components and props validate against a registry, so agents author interfaces without ever injecting runtime code into the app.",
    tags: ["Tokenized", "Allowlisted", "Fallbacks"],
    photo: "/assets/feature-2.png",
    ctaSlug: "registry",
    ctaLabel: "Explore the Registry",
    glass: {
      head: "Token contract",
      tabs: ["Color", "Type", "Motion"],
      kicker: "CSS variables in the shared contract",
      num: "48",
      tag: "tokens",
      rows: [
        { label: "Components", value: "resident", fill: "100%" },
        { label: "Props", value: "validated", fill: "72%" },
        { label: "Unknown", value: "fallback", fill: "28%" }
      ],
      caption: "This site is seeded by the same vocabulary"
    }
  },
  {
    index: "Feature 03",
    title: "Coordination and knowledge kept out of the loop.",
    body: "Work records, squads, approvals, provenance, and temporal context live in their own surfaces — durable source, not chat memory, and never tangled with the core agent loop.",
    tags: ["Work records", "Provenance", "Temporal"],
    photo: "/assets/feature-3.png",
    ctaSlug: "orchestra",
    ctaLabel: "Explore Orchestra",
    glass: {
      head: "One shared source",
      kicker: "Products generated from it",
      num: "5",
      tag: "surfaces",
      rows: [
        { label: "Routes & links", value: "resolved" },
        { label: "Metadata & sitemap", value: "generated" },
        { label: "AI index", value: "published" }
      ],
      caption: "Nothing drifts — it is all one source"
    }
  }
];

function GlassPanel({ spec }: { spec: GlassSpec }) {
  return (
    <div className="glass glass--feature" aria-hidden="true">
      <div className="glass-head">
        <span>{spec.head}</span>
        <span className="glass-head-dot" />
      </div>
      {spec.tabs && (
        <div className="glass-tabs">
          {spec.tabs.map((tab, index) => (
            <span className="glass-tab" data-active={index === 0 ? "true" : undefined} key={tab}>
              {tab}
            </span>
          ))}
        </div>
      )}
      <span className="glass-kicker">{spec.kicker}</span>
      <div className="glass-num">
        {spec.num}
        <span className="glass-num-tag">{spec.tag}</span>
      </div>
      {spec.rows &&
        (spec.rows.some((row) => row.fill) ? (
          <div className="glass-progress">
            {spec.rows.map((row) => (
              <span className="glass-progress-row" key={row.label}>
                <span>{row.label}</span>
                <span className="glass-progress-track">
                  <i style={{ "--fill": row.fill ?? "100%" } as React.CSSProperties} />
                </span>
                <em>{row.value}</em>
              </span>
            ))}
          </div>
        ) : (
          <div className="glass-rows">
            {spec.rows.map((row) => (
              <span className="glass-row" key={row.label}>
                <span>{row.label}</span>
                <strong>{row.value}</strong>
              </span>
            ))}
          </div>
        ))}
      <p className="glass-caption">{spec.caption}</p>
    </div>
  );
}

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
          {blocks.map((block) => {
            const project = getProject(block.ctaSlug);
            return (
              <article className="sticky-block" key={block.index}>
                <div className="sticky-block-media">
                  <div className="photo-fill" aria-hidden="true">
                    <Image
                      src={block.photo}
                      alt=""
                      fill
                      loading="eager"
                      sizes="(max-width: 1024px) 100vw, 52vw"
                    />
                  </div>
                  <GlassPanel spec={block.glass} />
                </div>

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
                  {project && (
                    <ButtonLink href={project.route} variant="primary">
                      {block.ctaLabel}
                    </ButtonLink>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
