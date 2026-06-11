import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";

type CapabilityBandProps = {
  eyebrow?: string;
  number?: string;
  title: string;
  lead?: string;
  capabilities: readonly string[];
};

/**
 * Numbered capability list (Kirimo "Our Service" numbered rows). Each capability is a
 * structured row with a mono number and a hairline divider — progressive, scannable.
 * Used on project detail pages with `capabilities[]`.
 */
export function CapabilityBand({
  eyebrow = "Capabilities",
  number,
  title,
  lead,
  capabilities
}: CapabilityBandProps) {
  return (
    <Section className="capability-band" aria-label={title}>
      <SectionHeading eyebrow={eyebrow} number={number} title={title} lead={lead} />
      <ol className="capability-list">
        {capabilities.map((capability, index) => (
          <li className="capability-row" key={capability}>
            <span className="capability-num" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <p className="capability-text">{capability}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
