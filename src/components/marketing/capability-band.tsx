/**
 * Numbered capability list (progressive-disclosure-style structure). Each capability is a 01/02/03
 * numbered cell in a hairline grid — the Nouva "Feature Card" rhythm translated to our content.
 */
export function CapabilityBand({ capabilities }: { capabilities: string[] }) {
  return (
    <div className="capability-grid">
      {capabilities.map((capability, index) => (
        <div className="capability" key={capability}>
          <span className="capability-number">{String(index + 1).padStart(2, "0")}</span>
          <p>{capability}</p>
        </div>
      ))}
    </div>
  );
}
