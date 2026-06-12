import { Reveal } from "@/components/system/reveal";
import { site } from "@/content/site";
import { Section } from "@/components/primitives/section";
import { Eyebrow } from "@/components/primitives/section-heading";

/**
 * Why It Matters — Nouva's thesis slot: a large editorial statement (the studio's
 * positioning) split into emphasized runs, supported by a short row of stance cards.
 * The cards are qualitative positioning framings of the family's real concerns (from
 * `site.description` / `site.home.proof`) — not invented metrics or claims.
 */
const stanceCards = [
  {
    title: "Open at the core",
    body: "The runtimes, contracts, and interfaces are built as public, source-owned infrastructure — not a closed funnel."
  },
  {
    title: "One shared contract",
    body: "Governed agents, trusted UI, coordination, and knowledge meet on the same contracts instead of scattered, bespoke surfaces."
  },
  {
    title: "Readable by humans and agents",
    body: "Every route, summary, and source boundary is published as stable, structured text that both people and agents can resolve."
  }
] as const;

export function ThesisStatement() {
  const cards = stanceCards;

  return (
    <Section className="thesis" divided aria-labelledby="thesis-title">
      <div className="thesis-statement">
        <Eyebrow>Why it matters</Eyebrow>
        <Reveal as="h2" className="thesis-title">
          <span id="thesis-title">
            One coherent public surface for a product family that is{" "}
            <em className="text-accent">agent-native by design</em> and open at the core.
          </span>
        </Reveal>
        <Reveal as="p" className="thesis-proof" delay={80}>
          {site.home.proof}
        </Reveal>
      </div>

      <div className="thesis-cards">
        {cards.map((card, index) => (
          <Reveal as="article" className="thesis-card" key={card.title} delay={index * 70}>
            <p className="thesis-card-index">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="thesis-card-title">{card.title}</h3>
            <p className="thesis-card-body">{card.body}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
