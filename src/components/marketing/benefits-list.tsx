import { Tag } from "@/components/ui/badge";
import { projects } from "@/content/projects";

/**
 * Benefits slot — distilled cross-family themes. Each row states a real benefit
 * the family is built around, and cites the actual projects (and a real
 * capability phrase drawn from their content) that embody it. Nothing here is
 * invented: labels and supporting points come straight from projects.ts.
 */
const bySlug = Object.fromEntries(projects.map((project) => [project.slug, project]));

const THEMES: { title: string; body: string; sources: string[] }[] = [
  {
    title: "One enforcement path",
    body: "Policy, tools, memory, and user-facing actions run through a single governed contract instead of UI backdoors — so behavior stays auditable as the family grows.",
    sources: ["harness", "orchestra"]
  },
  {
    title: "Safe agent-authored surfaces",
    body: "Agents get a tokenized UI vocabulary and an allowlisted render contract, so they can compose interfaces without injecting runtime code.",
    sources: ["registry"]
  },
  {
    title: "Provenance you can reason over",
    body: "Temporal records, deltas, and freshness are first-class, so humans and agents can see what changed, why, and which source supports it.",
    sources: ["intercal"]
  },
  {
    title: "Open, governed collaboration",
    body: "Reputation, deposits, and public-view harnesses give autonomous and assisted agents a visible social and governance layer.",
    sources: ["collectiva"]
  }
];

export function BenefitsList() {
  return (
    <div className="benefits">
      {THEMES.map((theme, index) => (
        <article className="benefit-row" key={theme.title}>
          <div className="benefit-label">
            <span className="cell-num">{String(index + 1).padStart(2, "0")}</span>
            <h3>{theme.title}</h3>
          </div>
          <div>
            <p>{theme.body}</p>
            <div className="benefit-meta">
              {theme.sources.map((slug) => {
                const project = bySlug[slug];
                return project ? <Tag key={slug}>{project.shortName}</Tag> : null;
              })}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
