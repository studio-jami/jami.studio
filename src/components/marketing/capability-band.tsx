import { Reveal } from "@/components/system/reveal";

/**
 * Numbered capability list (brief §5/§10): each capability gets an `01/02/03` index in a
 * hairline grid. Used on project detail pages from `project.capabilities[]`.
 */
export function CapabilityBand({ capabilities }: { capabilities: string[] }) {
  return (
    <Reveal>
      <div className="capabilities">
        {capabilities.map((capability, index) => (
          <div className="capability" key={capability}>
            <span className="capability-index">{String(index + 1).padStart(2, "0")}</span>
            <p>{capability}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
