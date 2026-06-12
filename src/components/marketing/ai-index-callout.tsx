import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";

/**
 * The Kirimo "Our News" slot — but there is no blog. Instead it points readers at
 * the AI-readable surface (`llms.txt` / `llms-full.txt`) and the FAQ source notes,
 * which is the honest equivalent of "latest from the studio" for this hub. No
 * invented articles, no dates, no fabricated posts.
 */
const RESOURCES = [
  {
    label: "AI index",
    href: "/llms.txt",
    blurb: "A compact, agent-readable map of every route and project summary."
  },
  {
    label: "AI source bundle",
    href: "/llms-full.txt",
    blurb: "The expanded source file with positioning, capabilities, and link contracts."
  },
  {
    label: "Sitemap",
    href: "/sitemap.xml",
    blurb: "Every canonical public URL, generated from the same shared source data."
  }
] as const;

export function AIIndexCallout() {
  return (
    <div className="ai-callout">
      <SectionHeading
        index="08"
        eyebrow="Readable by design"
        titleId="ai-callout-title"
        title="Made for human and agent readers."
        lead={
          <p>
            No newsroom — the studio publishes machine-readable source instead. Resolve the whole
            family from stable generated text.
          </p>
        }
      />

      <ul className="ai-callout-grid">
        {RESOURCES.map((resource) => (
          <li key={resource.href} className="ai-callout-item">
            <p className="ai-callout-name">{resource.label}</p>
            <p className="ai-callout-blurb">{resource.blurb}</p>
            <ButtonLink href={resource.href} variant="link">
              Open {resource.label}
            </ButtonLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
