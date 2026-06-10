import { Reveal } from "@/components/primitives/reveal";
import { Eyebrow } from "@/components/primitives/eyebrow";

type ProofItem = {
  label: string;
  body: string;
};

type ProofBandProps = {
  eyebrow: string;
  index?: string;
  title: string;
  lead?: string;
  items: ProofItem[];
};

/**
 * Earned-credibility band: a focused statement plus structured proof points.
 * Used on the home page (source-data proof) and project pages (proof posture).
 */
export function ProofBand({ eyebrow, index, title, lead, items }: ProofBandProps) {
  return (
    <div className="proof-band">
      <div className="proof-band-head">
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
        <h2 className="proof-band-title">{title}</h2>
        {lead ? <p className="proof-band-lead">{lead}</p> : null}
      </div>
      <ul className="proof-grid">
        {items.map((item, position) => (
          <Reveal as="li" key={item.label} delay={position * 60} className="proof-item">
            <span className="proof-item-marker" aria-hidden="true">
              {String(position + 1).padStart(2, "0")}
            </span>
            <p className="proof-item-label">{item.label}</p>
            <p className="proof-item-body">{item.body}</p>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
