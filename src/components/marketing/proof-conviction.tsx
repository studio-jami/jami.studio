import { Container } from "@/components/ui/layout";
import { GhostBadge } from "@/components/ui/primitives";
import { site } from "@/content/site";

type ConvictionCell = {
  title: string;
  body: string;
};

/**
 * ProofConviction (the template's WhyItWorks) — the conviction section. A
 * centered Title block carries `site.home.proof` ("everything generated from one
 * shared source"), then a six-cell grid distils why the boundary holds. Every
 * line is real Studio framing from the content layer — no invented claims.
 */
export function ProofConviction({ id }: { id: string }) {
  const cells: ConvictionCell[] = [
    {
      title: "One shared source",
      body: "Routes, metadata, sitemap entries, and AI files all derive from the same centralized content data."
    },
    {
      title: "Centralized link contract",
      body: "Subdomains, repos, docs, and APIs are data-driven, so any product can move hosts without content rewrites."
    },
    {
      title: "Source boundaries hold",
      body: "This repo markets the family; the runtimes live in their own repositories and subdomains."
    },
    {
      title: "Human and agent readers",
      body: "Clean canonical URLs, ordered headings, and concise descriptions keep the structure legible to both."
    },
    {
      title: "Tokens as infrastructure",
      body: "A single token contract feeds both themes and every component, so the look stays uniform and reusable."
    },
    {
      title: "Static-first by design",
      body: "Content ships in the initial HTML, not buried behind client-only rendering — fast, stable, and ingestible."
    }
  ];

  return (
    <Container as="div">
      <div className="conviction-head">
        <GhostBadge>Why it holds together</GhostBadge>
        <h2 id={id} className="display-2">
          Everything you see is generated from one shared source
        </h2>
        <p className="lead">{site.home.proof}</p>
      </div>

      <div className="conviction-grid">
        {cells.map((cell, i) => (
          <article className="conviction-cell" key={cell.title}>
            <span className="conviction-cell-mark">{String(i + 1).padStart(2, "0")}</span>
            <h3>{cell.title}</h3>
            <p>{cell.body}</p>
          </article>
        ))}
      </div>
    </Container>
  );
}
