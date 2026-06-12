import { SectionHeading } from "@/components/ui/section-heading";
import { site } from "@/content/site";

/**
 * "About Us" — the studio's story and stance. A Section Title, a hairline divider,
 * then a two-column narrative pairing the platform framing with the four home
 * pillars rendered as the studio's stance statements.
 */
export function StudioAbout() {
  return (
    <div className="studio-about">
      <SectionHeading
        index="03"
        eyebrow="About the studio"
        titleId="about-title"
        title="One public hub, separate implementation surfaces."
        lead={
          <p>
            jami.studio is the front door to an open-core, agent-native product family. The runtimes
            live in their own repositories and subdomains; this site keeps the family coherent,
            credible, and readable to both people and agents.
          </p>
        }
      />

      <div className="studio-about-divider" aria-hidden="true" />

      <ul className="stance-grid">
        {site.home.pillars.map((pillar, index) => (
          <li key={pillar.title} className="stance-item">
            <span className="stance-index">{String(index + 1).padStart(2, "0")}</span>
            <h3 className="stance-title">{pillar.title}</h3>
            <p className="stance-body">{pillar.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
