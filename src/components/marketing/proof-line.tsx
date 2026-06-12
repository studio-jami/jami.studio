import { Container } from "@/components/layout/container";
import { site } from "@/content/site";

/**
 * Trusted By slot — honest, no fabricated logo wall. Synk's Trusted-By is a
 * quiet band; we map it to the real "one shared source" proof line and the
 * generated surfaces it produces, naming nothing we can't back.
 */
const SOURCES = [
  "Routes",
  "Metadata",
  "Sitemap",
  "Robots",
  "llms.txt",
  "Social cards"
];

export function ProofLine() {
  return (
    <Container>
      <section className="lattice proof-line" aria-label="Shared source of truth">
        <p className="proof-statement">
          One <em>shared source</em> drives every public surface — no hand-kept lists, no drift.
        </p>
        <div className="proof-source-row">
          {SOURCES.map((source) => (
            <span key={source} className="proof-chip">
              {source}
            </span>
          ))}
        </div>
        <p className="proof-note">{site.home.proof}</p>
      </section>
    </Container>
  );
}
