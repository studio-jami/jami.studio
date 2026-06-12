import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

/**
 * "Our Service" — the Kirimo numbered Service List. Each pillar from the content
 * layer becomes a numbered row (the "what the studio does" statement), paired with
 * the matching product and one of its real capabilities as the supporting detail.
 * Progressive-disclosure feel without fabricating any new claims.
 */
const PILLAR_TO_SLUG = ["harness", "registry", "orchestra", "intercal"] as const;

export function ServicePillars() {
  const rows = site.home.pillars.map((pillar, index) => {
    const project = projects.find((entry) => entry.slug === PILLAR_TO_SLUG[index]);
    return {
      pillar,
      capability: project?.capabilities[0],
      shortName: project?.shortName
    };
  });

  return (
    <div className="service-pillars">
      <SectionHeading
        index="04"
        eyebrow="What the studio does"
        titleId="service-title"
        title="Four foundations the whole family stands on."
        lead={
          <p>
            Every product in the family resolves to one of four jobs. The site presents them as the
            studio&apos;s stance, not a feature list.
          </p>
        }
      />

      <ul className="service-list">
        {rows.map((row, index) => (
          <li key={row.pillar.title} className="service-row">
            <span className="service-row-index">{String(index + 1).padStart(2, "0")}</span>
            <div className="service-row-main">
              <h3 className="service-row-title">{row.pillar.title}</h3>
              <p className="service-row-body">{row.pillar.body}</p>
            </div>
            <div className="service-row-meta">
              {row.shortName ? <span className="service-row-tag">{row.shortName}</span> : null}
              {row.capability ? <p className="service-row-detail">{row.capability}</p> : null}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
