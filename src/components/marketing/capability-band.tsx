import { Reveal } from "@/components/system/reveal";

type CapabilityBandProps = {
  capabilities: string[];
};

/**
 * Numbered capability list — the "services" / progressive-disclosure vocabulary
 * from Synk translated to per-product capabilities. Each item is a numbered card.
 */
export function CapabilityBand({ capabilities }: CapabilityBandProps) {
  return (
    <ol className="capability-grid">
      {capabilities.map((capability, index) => (
        <Reveal as="li" key={capability} className="capability-card" index={index}>
          <span className="capability-number" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="capability-text">{capability}</p>
        </Reveal>
      ))}
    </ol>
  );
}
