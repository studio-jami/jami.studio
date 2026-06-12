import type { ReactNode } from "react";
import { Container } from "@/components/ui/layout";
import { GhostBadge } from "@/components/ui/primitives";
import {
  ArchiveIcon,
  BoundaryIcon,
  InterfaceIcon,
  KeyIcon,
  KnowledgeIcon,
  RuntimeIcon
} from "@/components/ui/icons";
import { Reveal } from "@/components/system/reveal";
import { site } from "@/content/site";

/**
 * WhyItWorksGrid (template Benefits) — the denser 6-card matrix: circled icon,
 * title, muted body. Every line is distilled from a real proof point across
 * the family (harness, registry, orchestra, intercal, collectiva); the fourth
 * `site.home.pillars` entry (agent-readable knowledge) is housed here
 * verbatim. No invented numbers, no fabricated claims.
 */
const knowledgePillar = site.home.pillars[3];

const benefits: { icon: ReactNode; title: string; body: string }[] = [
  {
    icon: <RuntimeIcon size={20} />,
    title: "One enforcement path",
    body: "Harness is designed around a single governed loop instead of UI backdoors, so policy holds for every action."
  },
  {
    icon: <KeyIcon size={20} />,
    title: "Provider choice stays yours",
    body: "Model and engine choices live in adapters and configuration — BYOK-friendly, never hard-wired into the product."
  },
  {
    icon: <InterfaceIcon size={20} />,
    title: "Safe agent-rendered UI",
    body: "The Registry separates source installation from runtime rendering, so agents emit UI payloads without injecting code."
  },
  {
    icon: <ArchiveIcon size={20} />,
    title: "Coordination as durable source",
    body: "Orchestra turns work records, approvals, and squads into durable state — not chat memory that evaporates."
  },
  {
    icon: <KnowledgeIcon size={20} />,
    title: knowledgePillar.title,
    body: knowledgePillar.body
  },
  {
    icon: <BoundaryIcon size={20} />,
    title: "Clear product boundaries",
    body: "Every product is its own surface with its own repo; this site markets the family from one shared source."
  }
];

export function WhyItWorksGrid({ id }: { id: string }) {
  return (
    <Container as="div">
      <Reveal className="section-head">
        <GhostBadge>Benefits</GhostBadge>
        <h2 id={id}>
          Invisible foundations at your side{" "}
          <span className="heading-soft">delivering tangible guarantees.</span>
        </h2>
      </Reveal>

      <div className="benefit-grid">
        {benefits.map((benefit, i) => (
          <Reveal as="article" className="benefit-card" key={benefit.title} delay={(i % 3) * 80}>
            <span className="benefit-card-mark" aria-hidden="true">
              {benefit.icon}
            </span>
            <h3 className="benefit-card-title">{benefit.title}</h3>
            <p className="benefit-card-body">{benefit.body}</p>
          </Reveal>
        ))}
      </div>
    </Container>
  );
}
