import { Reveal } from "@/components/system/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/eyebrow";

type ProofItem = { label: string; body: string };

type ProofBandProps = {
  eyebrow?: string;
  number?: string;
  statement: string;
  items: ProofItem[];
  divider?: boolean;
};

/**
 * Earned-credibility band — no logo soup, no fake metrics. A distilled statement
 * plus structured proof facts drawn from the content layer.
 */
export function ProofBand({
  eyebrow = "How it holds together",
  number,
  statement,
  items,
  divider = true
}: ProofBandProps) {
  return (
    <Section divider={divider} className="proof-section" aria-labelledby="proof-title">
      <div className="proof-band">
        <div className="proof-statement">
          <Eyebrow number={number}>{eyebrow}</Eyebrow>
          <p id="proof-title" className="proof-quote">
            {statement}
          </p>
        </div>
        <ul className="proof-items">
          {items.map((item, index) => (
            <Reveal as="li" key={item.label} className="proof-item" index={index}>
              <span className="proof-item-label">{item.label}</span>
              <span className="proof-item-body">{item.body}</span>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
